import { useState } from 'react';
import { Collapse, HoverCard, ThemeIcon, UnstyledButton, createStyles, rem } from '@mantine/core';
import * as S from './styles';
import { ArrowLeft, ArrowRight } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
  control: {
    display: 'block',
    width: '100%',
    fontSize: theme.fontSizes.sm,
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    paddingLeft: rem(10),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  active: string;
  onClick?: () => void;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  link: string;
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export function LinksGroup({
  icon: Icon,
  label,
  links,
  setTitle,
  setActive,
  active,
  expand,
  setExpand,
  onClick,
  link,
}: LinksGroupProps) {
  const { classes, theme } = useStyles();

  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(true);
  const ChevronIcon = theme.dir === 'ltr' ? ArrowRight : ArrowLeft;
  const isMobile = useMediaQuery('(max-width: 420px)');
  const items = (hasLinks ? links : []).map((subMenu) => (
    <Link
      to={subMenu.link}
      key={subMenu.label}
      style={{
        textDecoration: 'none',
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.gray[1]
            : expand
            ? theme.colors.gray[1]
            : theme.colors.dark[9],
      }}
      className={expand ? classes.link : ''}
    >
      <S.SubItemsNavLink
        onClick={() => {
          setActive(subMenu.label);
          setTitle(subMenu.label);
        }}
        className={active === subMenu.label ? 'submenu-active' : ''}
      >
        {subMenu.label}
      </S.SubItemsNavLink>
    </Link>
  ));

  return (
    <HoverCard position="right" width={200} withArrow shadow="md">
      <S.NavItemsWrapper
        className={label === active ? 'active' : ''}
        onClick={() => {
          setActive(hasLinks ? '' : label);
          onClick ? onClick() : null;
        }}
      >
        {!expand ? (
          <HoverCard.Target>
            <UnstyledButton
              className={classes.control}
              onClick={() => {
                setExpand((e) => !e);
                setOpened((o) => !o);
              }}
            >
              {!hasLinks ? (
                <Link to={link}>
                  <S.ItemsNavLink expand={expand}>
                    <div
                      className="item-content"
                      onClick={() => {
                        setActive(label);
                      }}
                    >
                      <ThemeIcon size={30}>
                        <Icon size="1.4rem" />
                      </ThemeIcon>
                      {expand && <p>{label}</p>}
                    </div>
                  </S.ItemsNavLink>
                </Link>
              ) : (
                <S.ItemsNavLink expand={expand}>
                  <div className="item-content">
                    <ThemeIcon size={30}>
                      <Icon size="1.4rem" />
                    </ThemeIcon>
                    {expand && <p>{label}</p>}
                  </div>
                  {hasLinks && expand && (
                    <ChevronIcon
                      className={classes.chevron}
                      size="1rem"
                      style={{
                        transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                      }}
                    />
                  )}
                </S.ItemsNavLink>
              )}
            </UnstyledButton>
          </HoverCard.Target>
        ) : (
          <UnstyledButton
            onClick={() => {
              isMobile && !hasLinks && setExpand(false);

              setOpened((o: boolean) => !o);
            }}
            className={classes.control}
          >
            {!hasLinks ? (
              <Link to={link}>
                <S.ItemsNavLink expand={expand}>
                  <div className="item-content" onClick={() => setActive(label)}>
                    <ThemeIcon size={30}>
                      <Icon size="1.4rem" />
                    </ThemeIcon>
                    {expand && <p>{label}</p>}
                  </div>
                </S.ItemsNavLink>
              </Link>
            ) : (
              <S.ItemsNavLink expand={expand}>
                <div className="item-content">
                  <ThemeIcon size={30}>
                    <Icon size="1.4rem" />
                  </ThemeIcon>
                  {expand && <p>{label}</p>}
                </div>
                {hasLinks && expand && (
                  <ChevronIcon
                    className={classes.chevron}
                    size="1rem"
                    style={{
                      transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                    }}
                  />
                )}
              </S.ItemsNavLink>
            )}
          </UnstyledButton>
        )}

        {hasLinks && expand ? (
          <Collapse
            onClick={() => {
              isMobile && setExpand(false);
            }}
            in={opened}
          >
            {items}
          </Collapse>
        ) : hasLinks && !expand ? (
          <S.HoverCardWrapper>
            <HoverCard.Dropdown>
              <Collapse in={true}>{items}</Collapse>
            </HoverCard.Dropdown>
          </S.HoverCardWrapper>
        ) : null}
      </S.NavItemsWrapper>
    </HoverCard>
  );
}
