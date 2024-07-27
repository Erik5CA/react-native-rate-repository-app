// import { Component } from 'react'

// export class RepositoryListContainer extends Component {
//   render() {
//     return (
//       <div>RepositoryListContainer</div>
//     )
//   }
// }

// export default RepositoryListContainer

export const RepositoryListContainer = ({
  repositories,
  sort,
  setSort,
  loading,
  setSearch,
  search,
}) => {
  const repositoresNodes = repositories
    ? repositories?.edges.map((edge) => edge.node)
    : [];

  if (loading) return;

  return (
    <FlatList
      data={repositoresNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem data={item} />}
      ListHeaderComponent={() => (
        <>
          <SelectSorting sort={sort} setSort={setSort} />
          <TextInput
            placeholder="search"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </>
      )}
    />
  );
};
