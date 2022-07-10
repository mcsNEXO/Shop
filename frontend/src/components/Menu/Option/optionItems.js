const child = process.env.PUBLIC_URL + '/img/jpg/child2.jpg';
const man = process.env.PUBLIC_URL + '/img/jpg/man.jpg';
const woman = process.env.PUBLIC_URL + '/img/jpg/woman.jpg';

export const optionItems = [
    {
        id:1,
        img:child,
        alt:'child',
        title:'Child',
        path:'child',
        desc: 'Check it out'
    },
    {
        id:2,
        img:woman,
        alt:'woman',
        title:'Woman',
        path:'woman',
        desc: 'Check it out'
    },
    {
        id:3,
        img:man,
        alt:'man',
        title:'Man',
        path:'man',
        desc: 'Check it out'
    },
]