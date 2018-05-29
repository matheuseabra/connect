import React, { Component } from 'react';
import {
  onNameChanged,
  onRegistrationChanged,
  onBirthChanged,
  onAreaTematicaChanged,
  onEmailChanged,
  authUser,
  adicionaContato,
  dataPerfil,
  saveDataUser,
} from '../actions';
import {
  Dimensions,
  Text,
  ScrollView,
  View,
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  Modal,
  Picker
} from 'react-native';
import {
  Card,
  CardSection,
  Texts,
  HeaderImage,
  Input,
  Button,
  UserImage,
} from './commons';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../Styles';

class MeuPerfil extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      headerTitle: (
        <View style={{ flex: 1, alignContent: 'center' }}>
          <HeaderImage />
        </View>
      ),
      headerStyle: {
        paddingLeft: 15,
        paddingRight: 15,
        height: 55,
      },
      headerTitleStyle: {
        alignSelf: 'center',
      },
      drawerLabel: 'Meu perfil',
      drawerIcon: ({ tintColor }) => (
        <Icon name="person" color="#2a4065" size={27} />
      ),
      headerLeft: (
        <Icon
          name="bars"
          type="font-awesome"
          color="#2a4065"
          size={25}
          onPress={() => navigate('DrawerOpen')}
        />
      ),
      headerRight: (
        <Icon
          name="search"
          type="font-awesome"
          color="#2a4065"
          size={25}
          onPress={() => navigate('DrawerOpen')}
        />
      ),
    };
  };
  componentWillMount() {
    this.props.dataPerfil();
  }

  renderNavigateToEditPerfilButton() {
    if (this.props.loading) {
      return <Spinner size="large" color="#ffff" />;
    }

    return (
      <Button
        text="Editar Dados"
        styles={Styles.btnConfirm}
        onPress={() => this._showModal}
      />
    );
  }

  renderSaveDataUserButton() {
    const user = {
      namePerfil: this.props.namePerfil,
      registrationPerfil: this.props.registrationPerfil,
      birthdayPerfil: this.props.birthdayPerfil,
      cpfPerfil: this.props.cpfPerfil,
      area_tematicaPerfil: this.props.area_tematicaPerfil
    };

    if (this.props.loading) {
      return <Spinner size="large" color="#ffff" />;
    }

    return (
      <Button
        text="Salvar"
        styles={Styles.btnConfirm}
        onPress={() => {
          this.props.saveDataUser(user);
          this.setModalVisible(!this.state.modalVisible);
        }}
      />
    );
  }

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#000" />
        <ImageBackground
          style={styles.headerBackground}
          source={require('../../assets/img/background.jpg')}
        >
          <View style={styles.header}>
            <View style={styles.perfilFotoWwrap}>
              <Image
                style={styles.perfilFoto}
                source={require('../../assets/img/user_male.png')}
              />
            </View>
            <Text style={styles.name}>{this.props.namePerfil}</Text>
            <Text style={styles.idade}>{this.props.idadePerfil} anos</Text>
          </View>
          <View>
            
          </View>
        </ImageBackground>
        <View style={styles.areaBtn}>
          <View style={styles.photoGrid}>
            <Button
              text="Editar"
              styles={styles.btnEditar}
              onPress={() => {
                this.setModalVisible(true);
              }}
            />
          </View>
        </View>

        <Modal
          style={styles.modal}
          animationType="fade"
          presentationStyle="pageSheet"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          supportedOrientations={false}
        >
          <LinearGradient colors={['#2A4065', '#2BA3DA']}>
            <ScrollView style={Styles.scrollViewStyle}>
              <Card addStyle={{ paddingBottom: 40 }}>
                <Text style={styles.titulo}>Editar perfil</Text>
                <CardSection>
                  <Input
                    placeholder="Nome:"
                    onChangeText={namePerfil =>
                      this.props.onNameChanged(namePerfil)
                    }
                    value={this.props.namePerfil}
                  />
                </CardSection>
                <View>
                  <Texts text={this.props.errorMessageName} />
                </View>
                <CardSection>
                  <Input
                    placeholder="CPF:"
                    onChangeText={cpfPerfil =>
                      this.props.onRegistrationChanged(cpfPerfil)
                    }
                    value={this.props.cpfPerfil}
                  />
                </CardSection>
                <View>
                  <Texts text={this.props.errorMessageCpf} />
                </View>
                <CardSection>
                  <Input
                    placeholder="Nascimento: 00/00/0000"
                    onChangeText={birthdayPerfil =>
                      this.props.onBirthChanged(birthdayPerfil)
                    }
                    value={this.props.birthdayPerfil}
                  />
                </CardSection>
                <View>
                  <Texts text={this.props.errorMessageBirthday} />
                </View>
                <CardSection>
              <Picker
                selectedValue={this.props.area_tematicaPerfil}
                style={{ height: 50, width: 250 }}
                onValueChange={area_tematicaPerfil => this.props.onAreaTematicaChanged(area_tematicaPerfil)}
              >
                <Picker.Item label="Comunicação" value="Comunicação" />
                <Picker.Item label="Cultura" value="Cultura" />
                <Picker.Item label="Direitos Humanos e Justiça" value="Direitos Humanos e Justiça" />
                <Picker.Item label="Educação" value="Educação" />
                <Picker.Item label="Meio Ambiente" value="Meio Ambiente" />
                <Picker.Item label="Ciências Sociais e Aplicadas" value="Ciências Sociais e Aplicadas" />
                <Picker.Item label="Saúde" value="Saúde" />
                <Picker.Item label="Tecnologia e Produção" value="Tecnologia e Produção" />
                <Picker.Item label="Trabalho" value="Trabalho" />
              </Picker>
            </CardSection>
                <CardSection>{this.renderSaveDataUserButton()}</CardSection>
              </Card>
            </ScrollView>
          </LinearGradient>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontFamily: 'Ubuntu-Medium', 
    fontWeight: '200',
    fontSize: 18,
    color: '#000',
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingRight: 129,
    paddingLeft: 129,
    paddingBottom: 18,
    paddingTop: 15,
    marginTop: -24
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerBackground: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  header: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  perfilFotoWwrap: {
    width: 150,
    height: 150,    
    marginTop: 10,
    borderRadius: 100,
  },
  perfilFoto: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4,
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Ubuntu',
  },
  idade: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '300',
    fontFamily: 'Ubuntu',
    marginBottom: 10,
  },
  areaBtn: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEditar: {
    width: 80,
    height: 80,
    alignSelf: 'stretch',
    backgroundColor: '#2A4065',
    borderRadius: 50,
    elevation: 4,
    color: '#000',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    borderWidth: 6,
    borderRadius: 4,
  },
});
const mapStateToProps = state => {
  return {
    namePerfil: state.perfil.namePerfil,
    cpfPerfil: state.perfil.cpfPerfil,
    birthdayPerfil: state.perfil.birthdayPerfil,
    area_tematicaPerfil: state.perfil.area_tematicaPerfil,
    idadePerfil: state.perfil.idadePerfil,
    errorMessageName: state.perfil.errorMessageNamePerfil,
    errorMessageCpf: state.perfil.errorMessageCpfPerfil,
    errorMessageBirthday: state.perfil.errorMessageBirthdayPerfil
  };
};
export default connect(mapStateToProps, {
  dataPerfil,
  onNameChanged,
  onRegistrationChanged,
  onAreaTematicaChanged,
  onBirthChanged,
  saveDataUser,
})(MeuPerfil);
