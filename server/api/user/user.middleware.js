const userService = require('./user.service');
const User = require('../../dataBase/User');
const { joiValidatorSchema } = require('./user.validator');
const { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } = require('../../configs/file.configs');
const { NotFound, BadRequest } = require('../../errors/Apierror');

module.exports = {
	getUserDynamically:
		(paramName, from, dbField = paramName) =>
		async (req, res, next) => {
			try {
				const searchData = req[from][paramName];
				const user = await userService.findUserByParams({
					[dbField]: searchData,
				});

				if (!user) {
					return res.status(404).json({ message: 'User not found' });
					// throw new NotFound('User not found');
				}

				req.locals = { ...req.locals, user };

				next();
			} catch (e) {
				next(e);
			}
		},

	createValidator: async (req, res, next) => {
		try {
			const { error } = joiValidatorSchema.validate(req.body);

			if (error) {
				return res.status(404).json({ message: error.message });
			}

			next();
		} catch (e) {
			next(e);
		}
	},

	isEmailAndLoginExsist: async (req, res, next) => {
		try {
			const { email, loginName } = req.body;

			const candidate = await User.findOne({ email });
			if (candidate) {
				// throw new Conflict();
				return res
					.status(404)
					.json({ message: 'This email used, try another one' });
			}

			const login = await User.findOne({ loginName });
			if (login) {
				// throw new Conflict('This login used, try another one');
				return res
					.status(404)
					.json({ message: 'This login used, try another one' });
			}

			next();
		} catch (e) {
			next(e);
		}
	},

	emailOrLoginAuthorization: async (req, res, next) => {
		try {
			const loginData = req.body?.emailOrLogin;

			console.log(loginData);
			let dbField = 'loginName';

			if (loginData.includes('@')) {
				dbField = 'email';
			}

			const user = await userService.findUserByParams({ [dbField]: loginData });

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
				// throw new NotFound('User not found');
			}

			req.locals = { ...req.locals, user };

			next();
		} catch (e) {
			next(e);
		}
	},

	checkUserAvatar: (req, res, next) => {
		try {
			if (!req.files?.avatar) {
				throw new BadRequest('No file');
			}

			const { name, size, mimetype } = req.files.avatar;

			if (size > IMAGE_MAX_SIZE) {
				throw new BadRequest(`File ${name} is too big`);
			}

			if (!IMAGE_MIMETYPES.includes(mimetype)) {
				throw new BadRequest('Not valid file type');
			}

			next();
		} catch (e) {
			next(e);
		}
	},
};
