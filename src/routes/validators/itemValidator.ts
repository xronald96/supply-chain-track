import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

export const validateCreateItem = [
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name is required'),
	body('color')
		.isString()
		.withMessage('Color must be a string')
		.notEmpty()
		.withMessage('Color is required'),
	body('price')
		.isNumeric()
		.withMessage('Price must be a number')
		.notEmpty()
		.withMessage('Price is required'),
];

export const validateUpdateItem = [
	param('id').isInt().withMessage('ID must be an integer'),
	body('name').optional().isString().withMessage('Name must be a string'),
	body('color').optional().isString().withMessage('Color must be a string'),
	body('price').optional().isNumeric().withMessage('Price must be a number'),
];

export const validateItemId = [param('id').isInt().withMessage('ID must be an integer')];

export const validateItemEvents = [param('id').isInt().withMessage('ID must be an integer')];

export const validateLastEvent = [
	param('itemId').isInt().withMessage('Item ID must be an integer'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};
