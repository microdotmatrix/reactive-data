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
  }
});

// GraphQL query posts
const GET_POSTS = gql`
  query getPosts {
    posts (first: 100, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
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
      }
    }
    date
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

async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}