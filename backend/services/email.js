import nodemailer from 'nodemailer';

function formatMoney(amount, currency = 'TRY') {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
}

function buildReservationHtml(reservation, quote, pansiyonName) {
  const nights = quote.breakdown
    .map(
      (n) =>
        `<tr><td>${n.label}</td><td>${n.season}${n.isWeekend ? ' · Hafta sonu' : ''}</td><td align="right">${formatMoney(n.price)}</td></tr>`,
    )
    .join('');

  return `
    <h2>Yeni Rezervasyon Talebi — ${pansiyonName}</h2>
    <p><strong>${reservation.guestName}</strong> · ${reservation.guestPhone}</p>
    ${reservation.guestEmail ? `<p>E-posta: ${reservation.guestEmail}</p>` : ''}
    <p><strong>Oda:</strong> ${reservation.roomTypeName}</p>
    <p><strong>Tarih:</strong> ${reservation.checkIn} → ${reservation.checkOut} (${quote.nightCount} gece)</p>
    <p><strong>Kişi:</strong> ${reservation.guests}</p>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-top:12px">
      <tr><th>Gece</th><th>Sezon</th><th>Fiyat</th></tr>
      ${nights}
      <tr><td colspan="2"><strong>Toplam</strong></td><td align="right"><strong>${formatMoney(quote.total)}</strong></td></tr>
    </table>
    ${reservation.notes ? `<p><strong>Not:</strong> ${reservation.notes}</p>` : ''}
    <p style="color:#666;margin-top:16px">Durum: Onay bekliyor · Ödeme: ${reservation.paymentStatus === 'unpaid' ? 'Henüz alınmadı' : reservation.paymentStatus}</p>
  `;
}

export async function sendReservationEmails(reservation, quote, pansiyon) {
  const transporter = getTransporter();
  const from = process.env.MAIL_FROM || process.env.SMTP_USER || pansiyon.email;
  const to = process.env.MAIL_TO || pansiyon.email;

  if (!transporter) {
    console.log('[email] SMTP yapılandırılmadı — rezervasyon kaydedildi, mail gönderilmedi.');
    return { sent: false, reason: 'smtp_not_configured' };
  }

  const html = buildReservationHtml(reservation, quote, pansiyon.name);
  const subject = `Yeni rezervasyon: ${reservation.guestName} — ${reservation.roomTypeName}`;

  await transporter.sendMail({ from, to, subject, html });

  if (reservation.guestEmail) {
    await transporter.sendMail({
      from,
      to: reservation.guestEmail,
      subject: `${pansiyon.name} — Rezervasyon talebiniz alındı`,
      html: `
        <h2>Merhaba ${reservation.guestName},</h2>
        <p>${pansiyon.name} için rezervasyon talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>
        <p><strong>Oda:</strong> ${reservation.roomTypeName}</p>
        <p><strong>Tarih:</strong> ${reservation.checkIn} → ${reservation.checkOut}</p>
        <p><strong>Toplam tutar:</strong> ${formatMoney(quote.total)}</p>
        <p>Onay ve ödeme bilgisi için ${pansiyon.phoneDisplay} numarasından bize ulaşabilirsiniz.</p>
      `,
    });
  }

  return { sent: true };
}
