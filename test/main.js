import assert from 'better-assert';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url =
	'https://al3xback.github.io/fmentor-article-preview-mocha-better-assert/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;

			const isAnImageExist = (name) => {
				if (!name) {
					return;
				}

				const imgEls = document.querySelectorAll('img');

				let isImgExist = false;

				for (let i = 0; i < imgEls.length; i++) {
					const source = imgEls[i].src;

					if (source.includes(`${name}.jpg`)) {
						isImgExist = true;
						break;
					}
				}

				return isImgExist;
			};
			global.isAnImageExist = isAnImageExist;
		} catch (err) {
			console.log(err);
		}
	});

	it("should have a 'drawers' image with jpg extention inside the card element", () => {
		const isImageExist = isAnImageExist('drawers');
		assert(isImageExist);
	});

	it("should have a 'avatar' image with jpg extention inside the card element", () => {
		const isImageExist = isAnImageExist('avatar');
		assert(isImageExist);
	});
});
