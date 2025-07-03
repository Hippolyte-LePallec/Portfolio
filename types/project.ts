export type Technology = {
    name: string;
    icon: string;
};

export type Project = {
    title: string;
    image: string;
    description: string;
    link: string;
    tags: string[];
    technologies: Technology[];
};
