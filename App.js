

import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

const App = () => {

  const [tabs, setTabs] = useState([
    {
      key: 0,
      title: 'one',
      selected: true,
      content: 1
    },
    {
      key: 1,
      title: 'two',
      selected: false,
      content: 2
    },
    {
      key: 2,
      title: 'three',
      selected: false,
      content: 3
    },
    {
      key: 3,
      title: 'four',
      selected: false,
      content: 4
    },
    {
      key: 4,
      title: 'five',
      selected: false,
      content: 4
    }
  ])

  const [currentPage, setCurrentPage] = useState(0);
  const refScroll = useRef(null);

  onPageScroll = ({ nativeEvent }) => {
    if (nativeEvent) {
      const newArr = tabs.map(e => {
        if (e.key == nativeEvent.position) {
          return { ...e, selected: true }
        } else {
          return { ...e, selected: false }
        }
      })
      console.log("newArr:", newArr)
      setTabs(newArr);
      setCurrentPage(nativeEvent.position);
    }
  }

  // console.log('STATE:', currentPage, "tabs:", tabs);

  onPageSelected = ({ nativeEvent }) => {
    console.log("onPageSelected")
    if (nativeEvent) {
      refScroll.current.scrollToIndex({ animated: true, index: nativeEvent.position });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <FlatList
          bounces={false}
          showsHorizontalScrollIndicator={false}
          ref={refScroll}
          horizontal
          data={tabs}
          keyExtractor={item => `key-${item.key}`}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  borderWidth: item.selected ? 0 : 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: Dimensions.get('window').width * 0.25,
                  height: 50,
                  backgroundColor: item.selected ? 'red' : 'green'
                }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color:'white' }}>{item.title}</Text>
              </View>
            )
          }}
        />
      </View>
      <ViewPager
        onPageSelected={this.onPageSelected}
        style={styles.viewPager}
        initialPage={currentPage}
        onPageScroll={this.onPageScroll}>
        {
          tabs.map((e, index) => {
            return <View
              key={e.key}
              style={{ backgroundColor: 'pink', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 100, fontWeight: 'bold', color: 'black' }}>{e.content}</Text>
            </View>
          })
        }
      </ViewPager>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});

export default App;
