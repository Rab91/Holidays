import React, {useState,useEffect} from "react";

import {
  Text,
  View,
  FlatList,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
} from "native-base";
import moment from 'moment';
import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('https://www.gov.uk/bank-holidays.json')
      .then((response) => response.json())      
      .then(data=>{
        setData(data);
        let bankHolidays=data;
        let england=bankHolidays["england-and-wales"].events;
        var now=new Date();
        var thisMonth = now.getUTCMonth() + 1; 
        var thisDay = now.getUTCDate();
        var thisYear = now.getUTCFullYear();
        var thisDate = thisYear + '-' +thisMonth + '-' +thisDay;
        england.map((item: { date: string; title: string })=>{
          const [year, month, date] = item.date.split("-");
          if(Date.parse(thisDate) <= Date.parse(item.date)){
          return (
            <View>
              <Text>${date} / ${month} / ${year}</Text>
              <Text>{item.title}</Text>
            </View>
          )
        }}
        )
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  console.log(data); 
 
  return (
    <NativeBaseProvider>
        <VStack alignItems="center" marginTop='20'>
          <Heading size="lg">Upcoming UK Bank Holidays </Heading>
        </VStack>
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 14, color: 'blue', textAlign: 'center', paddingBottom: 10}}>Holidays:</Text>
          <Text>{JSON.stringify(data,null,2)}</Text>
          
        </View>
      )}
    </NativeBaseProvider>
  );
  

}

