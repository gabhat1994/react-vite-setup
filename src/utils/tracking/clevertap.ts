import clevertap from 'clevertap-web-sdk';

clevertap.privacy.push({ optOut: false });
clevertap.privacy.push({ useIP: false });
if (process.env.VITE_CLEVERTAP_TOKEN) {
  type Region = 'eu1' | 'in1' | 'sg1' | 'us1' | 'sk1';
  clevertap.init(
    process.env.VITE_CLEVERTAP_TOKEN,
    (process.env.VITE_CLEVERTAP_REGION as Region) || 'us1',
    process.env.VITE_TARGET_DOMAIN,
  );
}
clevertap.spa = true;

export default clevertap;
