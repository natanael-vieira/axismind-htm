const QRCode = require('qrcode');

const pixKey = 'natnaelsales@gmail.com';
const beneficiary = 'NATANAEL SALES VIEIRA';
const city = 'PALHOCA';

function field(id, value) {
  return `${id}${Buffer.byteLength(value).toString().padStart(2, '0')}${value}`;
}

function crc16(payload) {
  let crc = 0xffff;

  for (const byte of Buffer.from(payload)) {
    crc ^= byte << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

const merchantAccount = field('00', 'br.gov.bcb.pix') + field('01', pixKey);
const additionalData = field('05', '***');
const payloadWithoutCrc =
  field('00', '01') +
  field('26', merchantAccount) +
  field('52', '0000') +
  field('53', '986') +
  field('58', 'BR') +
  field('59', beneficiary) +
  field('60', city) +
  field('62', additionalData) +
  '6304';
const payload = payloadWithoutCrc + crc16(payloadWithoutCrc);

QRCode.toFile('public/brand/pix-qrcode.png', payload, {
  errorCorrectionLevel: 'H',
  margin: 4,
  width: 720,
  color: { dark: '#28363B', light: '#FFFFFF' },
}).then(() => console.log('QR Code PIX gerado em public/brand/pix-qrcode.png'));
