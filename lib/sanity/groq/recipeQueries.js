const { groq } = require("next-sanity");

const allPostSlugsQuery = groq`
*[_type == "post" && (isHidden == false || isHidden == null)] {
    slug
}
`;

module.exports = { allPostSlugsQuery };
