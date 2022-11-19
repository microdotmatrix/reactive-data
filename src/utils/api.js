// Load GraphQL Request module
import { GraphQLClient, gql } from "graphql-request";
// Load JSON function from React Router to standardize JSON formatting of returned fetch-data
import { json } from 'react-router-dom';

const is404 = (error) => /not found/i.test(error.message)

// Return promise function with a load delay timer for suspense animations
export function sleep(n = 500) {
  return new Promise((r) => setTimeout(r, n));
}

// Init GraphQL Client with proper headers
const graphql = new GraphQLClient(import.meta.env.VITE_WP_URL, {
  headers: {
    "Content-Type": "application/json"
  },
  credentials: 'same-origin',
  cache: 'force-cache'
});

// GraphQL query posts
const GET_POSTS = gql`
  query getPosts {
    posts (first: 100, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        postId
        date
        slug
        uri
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
            title
            sizes
            description
            caption
            altText
            mediaDetails {
              height
              width
            }
          }
        }
        tags(first: 10) {
          nodes {
            name
          }
        }
        categories(first: 5) {
          nodes {
            name
          }
        }
        author {
          node {
            name
            slug
            firstName
            lastName
            email
            url
            avatar {
              url
            }
          }
        }
      } 
    }
  }
`;

// Fetching posts from WordPress
export const getPosts = async () => {
  try {
    let data = await graphql.request(GET_POSTS, {});
    return json(data.posts);
  } catch (error) {
    throw error.message
  }
}

const GET_STICKY_POSTS = gql`
  query getStickyPosts {
    posts (first: 100, where: {orderby: {field: DATE, order: DESC}, onlySticky: true}) {
      nodes {
        postId
        date
        slug
        uri
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
            title
            sizes
            description
            caption
            altText
            mediaDetails {
              height
              width
            }
          }
        }
        tags(first: 10) {
          nodes {
            name
          }
        }
        categories(first: 5) {
          nodes {
            name
          }
        }
        author {
          node {
            name
            slug
            firstName
            lastName
            email
            url
            avatar {
              url
            }
          }
        }
      } 
    }
  }
`;

export const getStickyPosts = async () => {
  try {
    let data = await graphql.request(GET_STICKY_POSTS, {});
    return json(data.posts);
  } catch (error) {
    throw error.message
  }
}

// GraphQL query post by slug
const GET_POST = gql`
  query getPost($slug: String!) {
    postBy(slug: $slug) {
      id
      slug
      ...PostFragment
    }
  }
  fragment PostFragment on Post {
    date
    title
    excerpt
    content
    featuredImage {
      node {
        sourceUrl
        title
        sizes
        description
        caption
        altText
        mediaDetails {
          height
          width
        }
      }
    }
    tags(first: 10) {
      nodes {
        name
      }
    }
    categories(first: 5) {
      nodes {
        name
      }
    }
    author {
      node {
        name
        firstName
        lastName
        email
        nickname
        slug
        avatar {
          url
        }
      }
    }
  }
`;

// Fetching single post by it's slug param from WordPress
export async function getPost({ slug }) {
  try {
    let data = await graphql.request(GET_POST, { slug });
    return json(data.postBy);
  } catch (error) {
    if (is404(error)) return
    throw error.message
  }
}

export async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}

const GET_ABOUT = gql`
  query getAbout {
    pageBy(uri: "about") {
      id
      pageId
      slug
      title
      date
      content
      featuredImage {
        node {
          sourceUrl
          altText
          caption
          description
          sizes
          srcSet
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`

export async function getAboutPage() {
  try {
    let data = await graphql.request(GET_ABOUT, {});
    return json(data.pageBy);
  } catch (error) {
    if (is404(error)) return
    throw error.message
  }
}

const GET_HOME = gql`
  query getHomePage {
    pageBy(uri: "home") {
      id
      pageId
      slug
      title
      date
      content
      featuredImage {
        node {
          sourceUrl
          altText
          caption
          description
          sizes
          srcSet
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`

export async function getHomePage() {
  try {
    let data = await graphql.request(GET_HOME, {});
    return json(data.pageBy);
  } catch (error) {
    if (is404(error)) return
    throw error.message
  }
}

const SITE_INFO = gql`
  query siteInfo {
    generalSettings {
      title
      description
      dateFormat
      url
      language
    }
  }
`

const GET_MENU = gql`
  query getMenu {
    menuItems(where: {location: PRIMARY}) {
      nodes {
        label
        path
      }
    }
  }
`

export async function getSiteInfo() {
  try {
    let data = await graphql.request(SITE_INFO, {});
    return json(data.generalSettings);
  } catch (error) {
    if (is404(error)) return
    throw error.message
  }
}

export async function getNavMenu() {
  try {
    let data = await graphql.request(GET_MENU, {});
    return json(data.menu);
  } catch (error) {
    if (is404(error)) return
    throw error.message
  }
}