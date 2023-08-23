import { Theme } from '../../utils/theme/typings';
import { TFieldProps } from '../Form';

export type TSearchProps = {
  title?: string;
  accent?: Theme;
  noHeader: boolean;
  actionIsResultsUrl: boolean;
  action: string;
  submitErrorMessage: string;
  fields: TFieldProps[];
  resultsTotalText?: string;
  onLayout?: () => void;
}