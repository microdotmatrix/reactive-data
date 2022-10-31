// Load GraphQL Request module
import { GraphQLClient, gql } from "graphql-request";
// Load JSON function from React Router to standardize JSON formatting of returned fetch-data
import { json } from 'react-router-dom';

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
        title
        slug
        uri
        date
        excerpt
      } 
    }
  }
`;

// Fetching posts from WordPress
export const getPosts = async () => {
  await sleep(2000);
  let data = await graphql.request(GET_POSTS, {});
  if (!data) {
    throw new Error(`Posts failed to load... do they exist?`)
  }
  return json(data.posts);
}

// GraphQL query post by slug
const GET_POST = gql`
  query getPost($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      slug
      content
      date
      uri
    }
  }
`;

// Fetching single post by it's slug param from WordPress
export async function getPost({ slug }) {
  await sleep(1000);
  const data = await graphql.request(GET_POST, { slug });
  if (!data) {
    throw new Error(`Posts failed to load... do they exist?`)
  }
  return json(data.postBy);
}

async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}