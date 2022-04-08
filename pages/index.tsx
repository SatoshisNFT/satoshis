import { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useElementSize } from '@mantine/hooks';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { Element, Link } from 'react-scroll';
import ReactCountdown from 'react-countdown';
import { FiX } from 'react-icons/fi';
import { SiDiscord, SiTwitter } from 'react-icons/si';

interface IProps {
	seo: {
		title: string | undefined;
		description: string | undefined;
	};
	social: {
		telegram: string | undefined;
		twitter: string | undefined;
		discord: string | undefined;
	};
	countdownDate: string | undefined;
}

interface ITokenomics {
	name: string;
	tokens: number;
	supply: number;
}

interface IRoadmap {
	position: 'left' | 'right';
	title: string;
	subtitle: string;
	items: Array<[string, boolean]>;
}

const tokenomics: ITokenomics[] = [
	{
		name: 'Team Wallet',
		tokens: 700_000,
		supply: 7,
	},
	{
		name: 'Treasury',
		tokens: 400_000,
		supply: 4,
	},
	{
		name: 'Marketing Wallet',
		tokens: 500_000,
		supply: 5,
	},
	{
		name: 'Liquidity pool',
		tokens: 4_150_000,
		supply: 41.5,
	},
];

const roadmap: IRoadmap[] = [
	{
		position: 'right',
		title: 'Phase 1',
		subtitle: 'Q1 2022',
		items: [
			['Build a complete and competent team', true],
			['Polish the website', true],
			['Pitching idea and first product to initial investors', true],
			['Private sale', false],
			['Presale', false],
			['DEX listing', false],
			['Growing a strong community', false],
		],
	},
	{
		position: 'left',
		title: 'Phase 2',
		subtitle: 'Q1 & Q2 2022',
		items: [
			['Audit', false],
			['Partnerships', false],
			['Company registration', false],
			['Marketing our brand and first product', false],
			['Legal advisor', false],
			['Listing on coin-sites', false],
			['Auction of our first product', false],
		],
	},
	{
		position: 'right',
		title: 'Phase 3',
		subtitle: 'Q3 & Q4 2022',
		items: [
			['SATOSHIS designer platform', false],
			['CEX listing', false],
			['Physical store', false],
			['Metaverse store', false],
			['Exclusive giveaways for long-time holders', false],
		],
	},
];

const Home: NextPage<IProps> = ({ seo, social, countdownDate }) => {
	const [KYCModal, setKYCModal] = useState<boolean>(false);
	const { ref: headerRef, height: headerHeight } = useElementSize();
	const { ref: sliderRef, width: sliderWidth } = useElementSize();

	const rendererCountdown = (props?: any) => {
		if (props?.completed) {
			return <></>;
		} else {
			return (
				<div className="grid grid-flow-col gap-2 md:gap-5 text-center auto-cols-max select-none">
					{['days', 'hours', 'minutes', 'seconds'].map((type, idx) => (
						<div key={idx} className="flex flex-col p-2 bg-clip-padding">
							<div className="relative font-roboto text-5xl 2xl:text-6xl whitespace-nowrap overflow-hidden">
								{props?.[type] && (
									<AnimatePresence>
										<motion.span
											key={props?.[type]}
											transition={{ ease: 'easeOut', duration: 1.5 }}
											initial={{ y: -150, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											exit={{ y: 75, opacity: 0, position: 'absolute' }}
											className="hidden md:inline my-5"
										>
											{props?.[type] <= 9 ? `0${props?.[type]}` : props?.[type]}
										</motion.span>
									</AnimatePresence>
								)}
								{props?.[type] && <span className="md:hidden my-5">{props?.[type] <= 9 ? `0${props?.[type]}` : props?.[type]}</span>}
								{typeof props?.[type] === 'undefined' && '00'}
							</div>
							{props?.[type] <= 1 ? String(type).slice(0, String(type).length - 1) : type}
						</div>
					))}
				</div>
			);
		}
	};

	return (
		<div className="">
			<Head>
				<title>{seo?.title || 'Satoshis'}</title>
				<meta name="description" content={seo?.description || 'Introducing next generation jewellery. Gold-pegged NFTs in stylish designs'} />
			</Head>

			<header ref={headerRef} className="absolute top-0 right-0 left-0 w-full bg-black">
				<Popover>
					<div className="flex lg:flex-row justify-between items-center my-8 mx-6 lg:mx-16 2xl:my-16 2xl:mx-28">
						<div className="flex justify-center items-center gap-5 2xl:gap-8">
							<div className="relative h-10 w-40 2xl:w-72">
								<Image src="/assets/logo.png" alt="Logo" layout="fill" objectFit="contain" />
							</div>
							<div className="hidden lg:inline-block h-8 2xl:h-16 border-l border-l-white/50"></div>
							<ol className="nav-menu hidden lg:flex gap-3 text-white 2xl:text-3xl">
								<li>
									<Link to="about" smooth={true} duration={500} className="cursor-pointer">
										About
									</Link>
								</li>
								<li>
									<Link to="tokenomics" smooth={true} duration={500} className="cursor-pointer">
										Tokenomics
									</Link>
								</li>
								<li>
									<Link to="roadmap" smooth={true} duration={500} className="cursor-pointer">
										Roadmap
									</Link>
								</li>
								<li>
									<a href="/litepaper.pdf" target="_blank" rel="noopener noreferrer">
										Litepaper
									</a>
								</li>
								<li>
									<button onClick={() => setKYCModal(true)}>KYC</button>
								</li>
							</ol>
						</div>
						<ol className="hidden md:flex gap-3 2xl:gap-8">
							{social?.telegram && (
								<li>
									<a href={social?.telegram} target="_blank" rel="noopener noreferrer" className="">
										<div className="relative h-6 w-6 2xl:h-12 2xl:w-12">
											<Image src="/assets/social-icons/telegram.png" alt="Telegram" layout="fill" />
										</div>
									</a>
								</li>
							)}
							{social?.twitter && (
								<li>
									<a href={social?.twitter} target="_blank" rel="noopener noreferrer" className="">
										<div className="relative h-6 w-6 2xl:h-12 2xl:w-12">
											<Image src="/assets/social-icons/twitter.png" alt="Twitter" layout="fill" />
										</div>
									</a>
								</li>
							)}
							{social?.discord && (
								<li>
									<a href={social?.discord} target="_blank" rel="noopener noreferrer" className="">
										<div className="relative h-6 w-6 2xl:h-12 2xl:w-12">
											<Image src="/assets/social-icons/discord.png" alt="Discord" layout="fill" />
										</div>
									</a>
								</li>
							)}
						</ol>
						<div className="flex items-center md:hidden">
							<Popover.Button className="bg-gold p-2 inline-flex items-center justify-center text-white">
								<span className="sr-only">Open main menu</span>
								<MenuIcon className="h-6 w-6" aria-hidden="true" />
							</Popover.Button>
						</div>
					</div>

					<Transition
						as={Fragment}
						enter="duration-150 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel focus className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
							<div className="shadow-md bg-black border border-white overflow-hidden">
								<div className="px-5 pt-4 flex items-center justify-between">
									<div className="relative h-10 w-40 2xl:w-72">
										<Image src="/assets/logo.png" alt="Logo" layout="fill" objectFit="contain" />
									</div>
									<div className="-mr-2">
										<Popover.Button className="bg-gold p-2 inline-flex items-center justify-center text-white">
											<span className="sr-only">Close main menu</span>
											<XIcon className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>
								</div>
								<div className="px-2 pt-2 pb-3 space-y-1">
									<Link to="about" smooth={true} duration={500} className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 cursor-pointer">
										About
									</Link>
									<Link to="tokenomics" smooth={true} duration={500} className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 cursor-pointer">
										Tokenomics
									</Link>
									<Link to="roadmap" smooth={true} duration={500} className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 cursor-pointer">
										Roadmap
									</Link>
									<a href="/litepaper.pdf" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200">
										LitePaper
									</a>
									<button className="block px-3 py-2 rounded-md text-base font-medium text-gray-200" onClick={() => setKYCModal(true)}>
										KYC
									</button>
								</div>
								<div className="block w-full px-5 py-3 bg-black border-t border-white">
									<ol className="flex justify-between gap-3 2xl:gap-8">
										{social?.telegram && (
											<li>
												<a href={social?.telegram} target="_blank" rel="noopener noreferrer" className="">
													<div className="relative h-8 w-8 2xl:h-14 2xl:w-14">
														<Image src="/assets/social-icons/telegram.png" alt="Telegram" layout="fill" />
													</div>
												</a>
											</li>
										)}
										{social?.twitter && (
											<li>
												<a href={social?.twitter} target="_blank" rel="noopener noreferrer" className="">
													<div className="relative h-8 w-8 2xl:h-14 2xl:w-14">
														<Image src="/assets/social-icons/twitter.png" alt="Twitter" layout="fill" />
													</div>
												</a>
											</li>
										)}
										{social?.discord && (
											<li>
												<a href={social?.discord} target="_blank" rel="noopener noreferrer" className="">
													<div className="relative h-8 w-8 2xl:h-14 2xl:w-14">
														<Image src="/assets/social-icons/discord.png" alt="Discord" layout="fill" />
													</div>
												</a>
											</li>
										)}
									</ol>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			</header>

			<main className="">
				<Element name="hero" style={{ marginTop: `${headerHeight}px` }} className="flex flex-col-reverse md:flex-row justify-center items-center bg-black md:gap-0 min-h-[90vh] w-full px-6 md:px-16 2xl:px-28">
					<div className="grid place-items-center text-center md:inline-block md:text-left w-full font-roboto mt-10 md:mt-0 lg:pr-10">
						<h1 className="font-bold text-xl 2xl:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gold to-orange-900 uppercase tracking-wider">Welcome to Satoshis</h1>
						<p className="font-bold text-2xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl text-gray-100">Introducing next generation jewellery</p>
						<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="grid grid-flow-col place-items-center gap-2 bg-gold mt-8 2xl:mt-16 py-2 px-4 2xl:py-4 2xl:px-8">
							<svg className="inline-block h-6 w-6 2xl:h-10 2xl:w-10" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M45 0C20.151 0 0 20.151 0 45s20.151 45 45 45 45-20.151 45-45S69.858 0 45 0zM22.203 46.512l.189-.306 11.709-18.315c.171-.261.576-.234.702.054 1.953 4.383 3.645 9.837 2.853 13.23-.333 1.395-1.26 3.285-2.304 5.031a9.02 9.02 0 01-.441.747.397.397 0 01-.333.171H22.545a.398.398 0 01-.342-.612zm52.173 6.3a.408.408 0 01-.243.378c-.909.387-4.014 1.818-5.301 3.609-3.294 4.581-5.805 11.133-11.43 11.133H33.948c-8.316 0-15.048-6.759-15.048-15.102v-.27c0-.216.18-.396.405-.396h13.068c.261 0 .45.234.432.495a4.397 4.397 0 00.468 2.511 4.594 4.594 0 004.122 2.556h6.471v-5.049h-6.399a.414.414 0 01-.333-.648c.072-.108.144-.216.234-.342a49.469 49.469 0 002.331-3.717 29.88 29.88 0 001.611-3.222c.09-.198.162-.405.243-.603.126-.351.252-.684.342-1.008.09-.279.171-.567.243-.837.216-.936.306-1.926.306-2.952 0-.405-.018-.828-.054-1.224-.018-.441-.072-.882-.126-1.323-.036-.387-.108-.774-.18-1.17a24.352 24.352 0 00-.369-1.755l-.054-.225c-.108-.405-.207-.783-.333-1.188a44.34 44.34 0 00-1.233-3.645c-.162-.459-.342-.9-.531-1.332-.27-.666-.549-1.269-.801-1.836a13.363 13.363 0 01-.351-.738 21.95 21.95 0 00-.387-.801c-.09-.198-.198-.387-.27-.567l-.792-1.458c-.108-.198.072-.441.288-.378l4.95 1.341h.036l.648.189.72.198.261.072v-2.934C43.866 19.152 45 18 46.413 18c.702 0 1.341.288 1.791.756.459.468.747 1.107.747 1.818v4.365l.531.144c.036.018.081.036.117.063.126.09.315.234.549.414.189.144.387.324.621.513.477.387 1.053.882 1.674 1.449.162.144.324.288.477.441.801.747 1.701 1.62 2.565 2.592.243.279.477.549.72.846.234.297.495.585.711.873.297.387.603.792.882 1.215.126.198.279.405.396.603.36.531.666 1.08.963 1.629.126.252.252.531.36.801.333.738.594 1.485.756 2.241.054.162.09.333.108.495v.036c.054.216.072.45.09.693a7.714 7.714 0 01-.126 2.313c-.072.324-.162.63-.27.963-.117.315-.225.639-.369.954a12.946 12.946 0 01-.99 1.881c-.126.225-.279.459-.423.684-.162.234-.333.459-.477.675-.207.279-.423.567-.648.828-.198.27-.396.54-.621.783-.306.369-.603.711-.918 1.044-.18.216-.378.441-.585.639-.198.225-.405.423-.585.603-.315.315-.567.549-.783.756l-.513.459a.381.381 0 01-.27.108h-3.942v5.049h4.959c1.107 0 2.16-.387 3.015-1.116.288-.252 1.557-1.35 3.06-3.006a.354.354 0 01.189-.117l13.689-3.96a.4.4 0 01.513.387v2.898z"
									fill="#fff"
								/>
							</svg>
							<span className="font-semibold text-white 2xl:text-3xl">Coming soon</span>
						</motion.button>
					</div>
					<div className="relative flex justify-center pointer-events-none">
						<div className="md:h-3/4 md:w-3/4 2xl:h-auto 2xl:w-auto">
							<img src="/assets/hero.jpg" alt="" />
						</div>
					</div>
				</Element>

				<div className="grid lg:grid-cols-2 items-center py-[10vh] px-6 lg:px-16 2xl:px-28">
					<div ref={sliderRef} style={{ height: `${sliderWidth}px` }} className={`relative w-full lg:w-[80%] p-4 overflow-hidden`}>
						<div className="relative h-full w-full">
							<Image src="/assets/showcase/0.jpg" alt="" layout="fill" quality={100} />
						</div>
					</div>
					<div className="mt-14 lg:mt-0 space-y-5 2xl:space-y-8">
						<h4 className="font-roboto font-bold text-4xl 2xl:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gold to-orange-900 uppercase select-none">The Nakamoto Rings</h4>
						<p className="">Five rings crafted from high quality yellow gold. The genesis collection. A unique and exclusive design forged in honour of the one and only, Satoshi Nakamoto.</p>
						<p className="">
							Five unique rings engraved (I-V) on one side of the ring according to the order they are crafted in. Each ring will have its own NFT minted and the generated smart code of the NFT will be engraved
							inside the ring.
						</p>
						{countdownDate ? <ReactCountdown date={new Date(countdownDate).valueOf()} renderer={rendererCountdown} /> : rendererCountdown()}
					</div>
				</div>

				<Element name="about" className="relative grid place-items-center bg-black py-[10vh] px-6 lg:px-16 2xl:px-28">
					<div className="p-6 lg:p-20 bg-clip-padding bg-opacity-60">
						<h4 className="font-roboto font-bold text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-gold to-orange-900 uppercase select-none">About Us</h4>
						<div className="space-y-5 mt-5">
							<p className="text-justify text-gray-100">
								SATOSHIS is a jeweller with a goal to create and establish a multiverse* designer brand. Our vision is to create a brand where cryptocurrencies and NFTs are incorporated into the real world in
								form of designer jewellery by designing and creating jewellery forged with NFT contracts. Each jewellery will have its own NFT minted on the block-chain and the smart code will be engraved
								inside the accessory allowing a non-fungible proof of ownership and originality. Our products will be forged by high quality gold solely, meaning the NFT will always have a permanent price floor
								equivalent to the physical accessory's weight in gold (gold-pegged NFTs). This will be achievable by linking unique NFTs to every single accessory we design and produce. By doing this we are
								offering a revolutionary asset/accessory to our customers.
							</p>
						</div>
					</div>
				</Element>

				<Element name="tokenomics" className="relative py-[10vh] px-6 lg:px-16 2xl:px-28">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-stretch gap-5">
						<div className="md:col-span-2 grid place-items-center">
							<h4 className="font-roboto font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gold to-orange-900 uppercase select-none">Tokenomics</h4>
						</div>
						{tokenomics.map((item, idx) => (
							<div key={idx} className="flex flex-col justify-center bg-gray-300/5 p-6 lg:p-10 2xl:p-16 bg-clip-padding bg-opacity-60 border border-black/20 text-center">
								<h4 className="font-roboto font-bold text-xl 2xl:text-3xl uppercase">{item?.name}</h4>
								<span className="text-gray-800">
									{new Intl.NumberFormat().format(item?.tokens)} ({new Intl.NumberFormat().format(item?.supply)}%)
								</span>
							</div>
						))}
					</div>
				</Element>

				<Element name="roadmap" className="bg-black">
					<div className="max-w-[57.5rem] mx-auto py-[10vh]">
						<h4 className="font-roboto font-bold text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-gold to-orange-900 uppercase select-none">Roadmap</h4>
						<div className="scale-90 lg:scale-100 roadmap-wrap mt-5">
							<div className="roadmap-line" />
							<div className="roadmap">
								<div className="roadmap-year">2022</div>
							</div>
							{roadmap.map(({ position, title, subtitle, items }, idx) => (
								<div key={idx} className={`roadmap roadmap-${position}`}>
									<div className="roadmap-step">
										<div className="roadmap-head">
											<span className="roadmap-time">{subtitle}</span>
											<span className="roadmap-title">{title}</span>
										</div>
										<ul className="list list-disc list-inside text-gray-100">
											{items.map(([content, done], idx) => (
												<li key={idx} className={done ? 'line-through' : ''}>
													{content}
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>
					</div>
				</Element>
			</main>

			{KYCModal && (
				<div className="fixed inset-0 grid place-items-center bg-black/80 select-none z-[9999]">
					<div className="absolute max-w-2xl 2xl:max-w-6xl bg-gray-300/5 shadow-lg rounded-2xl m-3 p-2 2xl:p-5 bg-clip-padding bg-opacity-60 border border-black/20">
						<button className="absolute -top-2 -right-2 grid place-items-center h-6 w-6 2xl:h-10 2xl:w-10 bg-red-500 rounded-full" onClick={() => setKYCModal(false)}>
							<FiX color="#FFFFFF" />
						</button>
						<img src="/assets/kyc.jpg" alt="Satoshis KYC QR code" style={{ borderRadius: '1.5rem' }} draggable={false} onContextMenu={(e) => e.preventDefault()} />
					</div>
				</div>
			)}

			<footer className="grid place-items-center gap-10 my-10 mx-6">
				<div className="flex lg:flex-row justify-between items-center lg:max-w-5xl 2xl:max-w-6xl w-full bg-gray-300/5 p-5 bg-clip-padding bg-opacity-60 border border-black/20 py-10 px-6 lg:px-20">
					<div className="">
						<h4 className="font-monument font-bold text-xl 2xl:text-3xl tracking-widest">Join the community</h4>
						<p className="text-lg 2xl:text-2xl text-gray-800">We are so humbled to have your early support.</p>
						<div className="flex gap-5">
							{social?.twitter && (
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="grid grid-flow-col place-items-center gap-2 bg-gold mt-8 py-2 px-4"
									onClick={() => window.open(social?.twitter, '_blank')}
								>
									<SiTwitter color="#FFF" />
									<span className="font-semibold text-white">Twitter</span>
								</motion.button>
							)}

							{social?.discord && (
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="grid grid-flow-col place-items-center gap-2 bg-gold mt-8 py-2 px-4"
									onClick={() => window.open(social?.discord, '_blank')}
								>
									<SiDiscord color="#FFF" />
									<span className="font-semibold text-white">Discord</span>
								</motion.button>
							)}
						</div>
					</div>
					<div className="hidden lg:inline-block relative h-40 w-40 2xl:h-48 2xl:w-48">
						<Image src="/assets/community.png" alt="Community" layout="fill" />
					</div>
				</div>
				<p className="text-center">Copyright &copy; {new Date().getFullYear()} Satoshis. All rights reserved.</p>
			</footer>
		</div>
	);
};

Home.getInitialProps = () => ({
	seo: {
		title: process?.env?.SEO_TITLE,
		description: process?.env?.SEO_DESCRIPTION,
	},
	social: {
		telegram: process?.env?.TELEGRAM_LINK,
		twitter: process?.env?.TWITTER_LINK,
		discord: process?.env?.DISCORD_LINK,
	},
	countdownDate: process?.env?.COUNTDOWN_DATE,
});

export default Home;
