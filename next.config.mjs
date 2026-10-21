import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMDX({
  options: { remarkPlugins: [['remark-frontmatter']] },
});

export default withMDX(nextConfig);
