export type TAccordionSectionProps = {
  id?: string;
  title: string;
  intro: string;
  items: TAccordionProps[];
}

export type TAccordionProps = {
  title: string;
  text: string;
}