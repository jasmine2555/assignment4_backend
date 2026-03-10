import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { NotFoundError } from "../errors/notFoundError";
import { loans } from "../models/mockLoanData";
import { CreateLoanBody, Loan, UpdateLoanBody } from "../models/loanModel";

export const getHealth = (req: Request, res: Response): void => {
  res.status(HTTP_STATUS.OK).json({
    message: "API is running",
  });
};

export const getLoans = (req: Request, res: Response): void => {
  res.status(HTTP_STATUS.OK).json({
    message: "Loan applications retrieved",
    count: loans.length,
    data: loans,
  });
};

export const getLoanById = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const loan: Loan | undefined = loans.find((item: Loan) => item.id === id);

  if (!loan) {
    throw new NotFoundError("Loan not found", "LOAN_NOT_FOUND");
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Loan retrieved",
    data: loan,
  });
};

export const createLoan = (req: Request, res: Response): void => {
  const body: CreateLoanBody = req.body as CreateLoanBody;

  const newLoan: Loan = {
    id: loans.length + 1,
    applicant: body.applicant,
    amount: body.amount,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  loans.push(newLoan);

  res.status(HTTP_STATUS.CREATED).json({
    message: "Loan created",
    data: newLoan,
  });
};

export const updateLoan = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const body: UpdateLoanBody = req.body as UpdateLoanBody;
  const loan: Loan | undefined = loans.find((item: Loan) => item.id === id);

  if (!loan) {
    throw new NotFoundError("Loan not found", "LOAN_NOT_FOUND");
  }

  if (body.applicant !== undefined) {
    loan.applicant = body.applicant;
  }

  if (body.amount !== undefined) {
    loan.amount = body.amount;
  }

  if (body.status !== undefined) {
    loan.status = body.status;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Loan updated",
    data: loan,
  });
};

export const deleteLoan = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const index: number = loans.findIndex((item: Loan) => item.id === id);

  if (index === -1) {
    throw new NotFoundError("Loan not found", "LOAN_NOT_FOUND");
  }

  const deletedLoan: Loan[] = loans.splice(index, 1);

  res.status(HTTP_STATUS.OK).json({
    message: "Loan deleted",
    data: deletedLoan[0],
  });
};