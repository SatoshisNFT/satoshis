import { loginHandler } from '@storyofams/next-password-protect';

export default loginHandler(process?.env?.NEXT_PUBLIC_PASSWORD || '@SatoshisNFT2022', {
	cookieName: 'authorization',
});
