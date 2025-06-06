import { UseFormReturn } from "react-hook-form";
import { FormData } from "./shipping";

export interface StepProps {
  form: UseFormReturn<FormData>;
  isLoading: boolean;
}