import React, { Component } from 'react';
import { onNameChanged, onRegistrationChanged, onBirthChanged, onEmailChanged, onPasswordChanged, onConfirmPasswordChanged, authUser } from '../actions';
import { Card, CardSection, Texts, Input, Button, ButtonBack, Loading } from './commons';
import { ScrollView, Image, View, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../Styles';

const logo = require('../../assets/img/logo.png');

class CreateUser extends Component {
  static navigationOptions = {
    title: 'Criar conta',
    headerTintColor: '#2A4065',
    headerTitleStyle: {
      fontFamily: 'Ubuntu-Medium',
      fontWeight: '200',
      fontSize: 18,
    },
    headerStyle: {
      elevation: 5
    }
  };

  renderCreateUserButton() {
    const user = {
      name: this.props.name,
      cpf: this.props.cpf,
      birthday: this.props.birthday,
      email: this.props.email,
      password: this.props.password,
      error: this.props.error
    }

    return (
      <Button
        text="Cadastrar"
        styles={Styles.btnConfirm}
        onPress={() => { this.props.authUser(user); }}
      />
    );
  }

  showLoading() {
    if (this.props.loading) return (<Loading />);
  }

  render() {
    return (
      <LinearGradient colors={['#2A4065', '#2BA3DA']}>
        <ScrollView style={Styles.scrollViewStyle}>
          {this.showLoading()}
          <Card addStyle={{ paddingBottom: 40 }}>
            <CardSection>
              <Input
                placeholder="Nome:"
                onChangeText={name => this.props.onNameChanged(name)}
                value={this.props.name}
              />
            </CardSection>
            <View>
              <Texts text={this.props.errorMessageName} />
            </View>
            <CardSection>
              <Input
                keyboardType={'numeric'}
                placeholder="CPF:"
                onChangeText={cpf => this.props.onRegistrationChanged(cpf)}
                value={this.props.cpf}
              />
            </CardSection>
            <View>
              <Texts text={this.props.errorMessageCpf} />
            </View>
            <CardSection>
              <Input
                placeholder="Nascimento: 00/00/0000"
                onChangeText={birthday => this.props.onBirthChanged(birthday)}
                value={this.props.birthday}
              />
            </CardSection>
            <View>
              <Texts text={this.props.errorMessageBirthday} />
            </View>

            <CardSection>
              <Input                
                keyboardType={'email-address'}
                placeholder="E-mail: aluno@email.com"
                onChangeText={email => this.props.onEmailChanged(email)}
                value={this.props.email}
              />
            </CardSection>
            <View>
              <Texts text={this.props.errorMessageEmail} />
            </View>
            <CardSection>
              <Input
                placeholder="Senha:"
                secureTextEntry
                onChangeText={
                  password =>
                    this.props.onPasswordChanged(password)
                }
                value={this.props.password}
              />
            </CardSection>
            <View>
              <Texts text={this.props.errorMessagePassword} />
            </View>
            <CardSection>
              <Input
                placeholder="Confirmação de senha:"
                secureTextEntry
                onChangeText={confirmPassword => this.props.onConfirmPasswordChanged(confirmPassword, this.props.password)}
                value={this.props.confirmPassword}
              />
            </CardSection>
            <View>
              <Texts text={this.props.errorMessageConfirmPassword} />
            </View>
            <CardSection>
              {this.renderCreateUserButton()}
            </CardSection>
            <View>
              <Texts text={this.props.errorMessageCreateAccountFail} />
            </View>
          </Card>
        </ScrollView>
      </LinearGradient>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.createUser.name,
    cpf: state.createUser.cpf,
    birthday: state.createUser.birthday,
    email: state.createUser.email,
    password: state.createUser.password,
    confirmPassword: state.createUser.confirmPassword,
    loading: state.createUser.loading,
    error: state.createUser.error,
    errorMessageName: state.createUser.errorMessageName,
    errorMessageRegistration: state.createUser.errorMessageCpf,
    errorMessageBirthday: state.createUser.errorMessageBirthday,
    errorMessageEmail: state.createUser.errorMessageEmail,
    errorMessagePassword: state.createUser.errorMessagePassword,
    errorMessageConfirmPassword: state.createUser.errorMessageConfirmPassword,
    errorMessageCreateAccountFail: state.createUser.errorMessageCreateAccountFail
  };
};

export default connect(mapStateToProps, {
  onNameChanged,
  onRegistrationChanged,
  onBirthChanged,
  onEmailChanged,
  onPasswordChanged,
  onConfirmPasswordChanged,
  authUser
})(CreateUser);
