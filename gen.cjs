const fs = require('fs');
const digi = fs.readFileSync('digi.txt', 'utf8').trim();
const iefp = fs.readFileSync('iefp.txt', 'utf8').trim();
const content = `
export const logoDigiBase64 = '${digi}';
export const logoIefpBase64 = '${iefp}';
`;
fs.writeFileSync('api/logos.ts', content);
