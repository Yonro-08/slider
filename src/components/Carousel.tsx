import { CAROUSEL } from 'constants/carousel';
import { useEffect, useRef, useState } from 'react';

export default function Carousel() {
	const [carousel, setCarousel] = useState(CAROUSEL);
	const carouselRef = useRef<HTMLDivElement>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const showSlider = (type: 'prev' | 'next') => {
		carouselRef.current?.classList.remove('prev');
		carouselRef.current?.classList.remove('next');
		if (type === 'next') {
			if (carouselRef.current) {
				carouselRef.current.classList.add('next');
			}
			setCarousel(prev => {
				const items = [...prev];
				const firstItem = items.shift();
				return [...items, firstItem!];
			});
		}
		if (type === 'prev') {
			if (carouselRef.current) {
				carouselRef.current.classList.add('prev');
			}
			setCarousel(prev => {
				const items = [...prev];
				const lastItem = items.pop();
				return [lastItem!, ...items];
			});
		}
		resetInterval();
	};

	const resetInterval = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		intervalRef.current = setInterval(() => {
			showSlider('next');
		}, 7000);
	};

	useEffect(() => {
		resetInterval();
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return (
		<div className='carousel' ref={carouselRef}>
			<div className='list'>
				{carousel.map(item => (
					<div key={item.id} className='item'>
						<img src={item.url} />
						<div className='content'>
							<div className='author'>{item.author}</div>
							<div className='title'>{item.title}</div>
							<div className='topic'>{item.topic}</div>
							<div className='des'>{item.des}</div>
							<div className='buttons'>
								<button>See More</button>
								<button>Subscribe</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className='thumbnail'>
				{carousel.map(item => (
					<div key={item.id} className='item'>
						<img src={item.url} />
						<div className='content'>
							<div className='title'>{item.title}</div>
							<div className='des'>Description</div>
						</div>
					</div>
				))}
			</div>
			<div className='arrows'>
				<button className='prev' onClick={() => showSlider('prev')}>
					&lt;
				</button>
				<button className='next' onClick={() => showSlider('next')}>
					&gt;
				</button>
			</div>
			<div className='time' />
		</div>
	);
}
