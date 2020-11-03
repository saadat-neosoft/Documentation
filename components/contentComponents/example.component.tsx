import { makeStyles, createStyles, Theme, Toolbar, Typography, IconButton, Tooltip } from "@material-ui/core";
import { FunctionComponent, useContext } from "react";
import { IExampleLink } from "../../lib/content.interfaces";
import { DocumentationContext } from "../../pages/[...id]";
import { colorPalette } from "../../styles/theme";

import ExternalLinkIcon from "@material-ui/icons/OpenInNew";
import LinkIcon from "@material-ui/icons/Link";
import Link from "next/link";

const examplesStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            [theme.breakpoints.up("md")]: {
                flexDirection: "row",
            },
        },
        header: {
            backgroundColor: colorPalette.header,
            color: "white",
            minHeight: 48,
            display: "none",
            [theme.breakpoints.up("md")]: {
                display: "flex",
            },
        },
    }),
);

const exampleStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(2),
            maxHeight: '100%'
        },
        header: {
            backgroundColor: colorPalette.linkText,
            color: "white",
            minHeight: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& > *": {
                padding: theme.spacing(0.5),
            },
        },
        footer: {
            backgroundColor: colorPalette.linkText,
            color: "white",
            minHeight: 36,
            padding: theme.spacing(0.5),
            display: "none",
            [theme.breakpoints.up("md")]: {
                display: "unset",
            },
        },
        imageContainer: {
            height: 248,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        },
    }),
);

/**
 * Replaces <a> element, mainly for local linking and playground links
 */
export const ExampleComponent: FunctionComponent<IExampleLink> = (example) => {
    const context = useContext(DocumentationContext);
    const { id, title, description, image, type } = example;
    const classes = exampleStyles();
    const link = (type === "pg" ? "https://playground.babylonjs.com/" : "https://nme.babylonjs.com/") + (id ? `#${id}` : "");
    // just as a test

    const onPlaygroundPressed = () => {
        context.setActiveExample(example);
    };
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <IconButton onClick={onPlaygroundPressed} aria-label="Show playground" size="small" color="inherit">
                    <Tooltip title={`Open playground ${title}`}>
                        <LinkIcon></LinkIcon>
                    </Tooltip>
                </IconButton>
                {title}
                <Link href={link}>
                    <a target="_blank">
                        <IconButton aria-label="Open playground in a new tab" size="small" color="inherit">
                            <Tooltip title={`Open playground ${title} in a new tab`}>
                                <ExternalLinkIcon></ExternalLinkIcon>
                            </Tooltip>
                        </IconButton>
                    </a>
                </Link>
            </div>
            <div className={classes.imageContainer} style={{ backgroundImage: `url(${image})` }}></div>
            <div className={classes.footer}>{description}</div>
        </div>
    );
};

export const ExamplesComponent: FunctionComponent<{ examples: IExampleLink[] }> = ({ examples }) => {
    const classes = examplesStyles();
    // just as a test
    return (
        <>
            <Toolbar className={classes.header}>
                <Typography variant="h6" noWrap>
                    Examples
                </Typography>
            </Toolbar>
            {examples.map((link) => (
                <ExampleComponent key={link.id} {...link} />
            ))}
        </>
    );
};
