/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    sidebar: [
        {
            type: 'doc',
            label: 'Overview',
            id: 'overview',
        },
        {
            type: 'doc',
            id: 'types',
        },
        {
            type: 'doc',
            id: 'values',
        },
        {
            type: 'doc',
            id: 'FA2',
        },
        {
            type: 'doc',
            id: 'taquito',
        },
        {
            type: 'doc',
            id: 'conseiljs',
        },
    ],
};

module.exports = sidebars;
