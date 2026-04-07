import { View, Button } from "react-native";

const OrderSelector = ({ setOrder }) => {
  return (
    <View>
      <Button
        title="Latest"
        onPress={() =>
          setOrder({ orderBy: "CREATED_AT", orderDirection: "DESC" })
        }
      ></Button>
      <Button
        title="Lowest rated"
        onPress={() =>
          setOrder({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" })
        }
      ></Button>
      <Button
        title="Highest rated"
        onPress={() =>
          setOrder({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" })
        }
      ></Button>
    </View>
  );
};

export default OrderSelector;
