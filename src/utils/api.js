import { GraphQLClient, gql } from "graphql-request";
import { json, defer, useParams, useAsyncValue, useAsyncError } from 'react-router-dom';

export function sleep(n = 500) {
  return new Promise((r) => setTimeout(r, n));
}

export async function fetchData(...args) {
  const res = await fetch(...args);
  return res.json();
}

const graphql = new GraphQLClient(import.meta.env.VITE_WP_URL, {
  headers: {
    "Content-Type": "application/json"
  }
});

const GET_POSTS = gql`
  query getPosts {
    posts (first: 20, where: {orderby: {field: DATE, order: DESC}}) {
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

export const getPosts = async () => {
  let data = await graphql.request(GET_POSTS, {});
  if (!data) {
    throw new Error(`Posts failed to load... do they exist?`)
  }
  return json(data.posts);
}

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