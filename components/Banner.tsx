import { useState } from 'react';
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';

export default function Banner() {
	const [showBanner, setShowBanner] = useState<boolean>(true);

	return showBanner ? (
		<div style={{ zIndex: 9999 }} className="fixed right-0 bottom-0 left-0 p-4 2xl:p-6">
			<div className="relative">
				<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />

				<div className="relative p-0.5 2xl:p-1">
					<div className="bg-black/50 rounded-lg">
						<div className="max-w-7xl 2xl:max-w-[140rem] mx-auto py-3 px-3 sm:px-6 lg:px-8 2xl:py-8 2xl:px-8">
							<div className="flex items-center justify-between flex-wrap">
								<div className="w-0 flex-1 flex items-center">
									<span className="flex p-2 2xl:p-3 rounded-lg bg-gold">
										<SpeakerphoneIcon className="h-6 w-6 2xl:h-10 2xl:w-10 text-white" aria-hidden="true" />
									</span>
									<p className="ml-3 font-medium 2xl:text-3xl text-white truncate">
										<span className="md:hidden">Private sale is live!</span>
										<span className="hidden md:inline">Private sale is live!</span>
									</p>
								</div>
								<div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
									<a
										href="https://docs.google.com/forms/d/e/1FAIpQLSdvFFjUxbZMt8X20sc95zIocuGFpYjX3cWhHJjsX_cGBK-LJg/viewform"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center py-2 px-4 2xl:py-4 2xl:px-6 border border-transparent rounded-md shadow-sm text-sm font-medium 2xl:text-2xl text-gold bg-white hover:bg-indigo-50"
									>
										Join the movement
									</a>
								</div>
								<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
									<button type="button" className="-mr-1 flex p-2 2xl:p-3 rounded-md hover:bg-gold focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2" onClick={() => setShowBanner(false)}>
										<span className="sr-only">Dismiss</span>
										<XIcon className="h-6 w-6 2xl:h-10 2xl:w-10 text-white" aria-hidden="true" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : null;
}
