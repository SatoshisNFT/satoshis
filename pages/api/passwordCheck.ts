import { passwordCheckHandler } from '@storyofams/next-password-protect';

export default passwordCheckHandler(process?.env?.NEXT_PUBLIC_PASSWORD || '@SatoshisNFT2022', {
	cookieName: 'authorization',
});
