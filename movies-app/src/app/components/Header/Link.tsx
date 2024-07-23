import { ReactNode } from "react";
import styles from "@/app/styles/header.module.css"

type LinkProps = {
  children: ReactNode;
  href?: string;
};

export default function Link({ children, href }: LinkProps) {
  return (
    <li className={styles.link}><a href={href}>{children}</a></li>
  );
}
