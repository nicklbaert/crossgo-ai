import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./NavLink.module.css";

export { NavLink };

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  pushHistory: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
  pushHistory: true,
};

type NavLinkArguments = {
  children: any;
  href: string;
  exact: boolean;
  className: string;
  pushHistory: boolean;
};

function NavLink({
  children,
  href,
  exact,
  pushHistory,
  ...props
}: NavLinkArguments) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += ` ${styles.active}`;
  }

  props.className += " " + styles.link;

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

import NextLink from "next/link";

function Link({ href, children, ...props }: any) {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
}
