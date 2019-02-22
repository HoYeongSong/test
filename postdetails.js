render() {
    const title =
      typeof post !== "undefined" ? Tools.formatText(post.title.rendered) : "";
    const imageURL = Tools.getImage(post, Constants.PostImage.medium);

    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              RNKakaoTest.link(title, imageURL, result => console.log(result));
            }}
          >
            <View style={styles.button}>
              <Text style={styles.content}>카카오톡 공유하기</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
