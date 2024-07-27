import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { Component, useState } from "react";
import { useDebounce } from "use-debounce";
import { Searchbar } from "react-native-paper";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    padding: 15,
  },
  select: {
    backgroundColor: theme.colors.backGroundWhite,
    marginTop: 10,
    borderRadius: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SelectSorting = ({ sort, setSort }) => {
  return (
    <Picker
      style={styles.select}
      selectedValue={sort}
      onValueChange={(itemValue) => setSort(itemValue)}
    >
      <Picker.Item label="Latest repositories" value={"sort1"} />
      <Picker.Item label="Highest rated repositories" value={"sort2"} />
      <Picker.Item label="Lowest rated repositories" value={"sort3"} />
    </Picker>
  );
};

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;

    // ...

    return (
      <View style={styles.header}>
        <Searchbar
          placeholder="search"
          value={props.search}
          onChangeText={props.setSearch}
        />
        <SelectSorting sort={props.sort} setSort={props.setSort} />
      </View>
    );
  };
  render() {
    const repositoresNodes = this.props.repositories
      ? this.props.repositories?.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={repositoresNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem data={item} />}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sort, setSort] = useState("sort1");
  const [search, setSearch] = useState("");
  const [searchKeyword] = useDebounce(search, 500);
  const { repositories, loading, fetchMore } = useRepositories(
    sort,
    searchKeyword
  );

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      sort={sort}
      setSort={setSort}
      loading={loading}
      setSearch={setSearch}
      search={search}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
