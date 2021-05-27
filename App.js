import React from 'react';
import { StyleSheet, View, Button, StatusBar, Text } from 'react-native';
import { Notifications, Permissions, Constants } from 'expo';
import moment from 'moment';

export default class App extends React.Component {
  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === 'granted') {
      alert('Notification permissions granted.');
    }

    Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    alert(`Notification (${origin}) with data: ${JSON.stringify(data)}`);
  };

  _sendDelayedNotification() {
    const localNotification = {
      title: 'Não?',
      body: 'Patético.',
      data: { type: 'immediate' },
    };

    console.log('Scheduling immediate notification:', { localNotification });

    Notifications.presentLocalNotificationAsync(localNotification)
      .then((id) => console.info(`Immediate notification scheduled (${id})`))
      .catch((err) => console.error(err));
  }

  _sendImmediateNotification() {
    const localNotification = {
      title: '...',
      body: 'A CAÇADA COMEÇOU...',
      data: { type: 'immediate' },
    };

    console.log('Scheduling immediate notification:', { localNotification });

    Notifications.presentLocalNotificationAsync(localNotification)
      .then((id) => console.info(`Immediate notification scheduled (${id})`))
      .catch((err) => console.error(err));

    const localNotification1 = {
      title: 'RENGAR ESTÁ ATRÁS DE VOCÊ!',
      body: 'CUIDADO!',
      data: { type: 'delayed' },
    };

    const schedulingOptions1 = {
      time: new Date().getTime() + 1000,
    };
    console.log('Scheduling delayed notification:', {
      localNotification1,
      schedulingOptions1,
    });
    Notifications.scheduleLocalNotificationAsync(
      localNotification1,
      schedulingOptions1
    )
      .then((id) =>
        console.info(
          `Delayed notification scheduled (${id}) at ${moment(
            schedulingOptions1.time
          ).format()}`
        )
      )
      .catch((err) => console.error(err));

    const localNotification2 = {
      title: '....',
      body: 'Ele está se aproximando...',
      data: { type: 'delayed' },
    };

    const schedulingOptions2 = {
      time: new Date().getTime() + 8000,
    };
    console.log('Scheduling delayed notification:', {
      localNotification2,
      schedulingOptions2,
    });
    Notifications.scheduleLocalNotificationAsync(
      localNotification2,
      schedulingOptions2
    )
      .then((id) =>
        console.info(
          `Delayed notification scheduled (${id}) at ${moment(
            schedulingOptions2.time
          ).format()}`
        )
      )
      .catch((err) => console.error(err));

    const localNotification3 = {
      title: '.....',
      body: 'Ele sabe que você está aqui.',
      data: { type: 'delayed' },
    };

    const schedulingOptions3 = {
      time: new Date().getTime() + 10000,
    };
    console.log('Scheduling delayed notification:', {
      localNotification3,
      schedulingOptions3,
    });
    Notifications.scheduleLocalNotificationAsync(
      localNotification3,
      schedulingOptions3
    )
      .then((id) =>
        console.info(
          `Delayed notification scheduled (${id}) at ${moment(
            schedulingOptions3.time
          ).format()}`
        )
      )
      .catch((err) => console.error(err));

    const localNotification4 = {
      title: 'Rengar te achou.',
      body: 'You have been slain.',
      data: { type: 'delayed' },
    };

    const schedulingOptions4 = {
      time: new Date().getTime() + 13000,
    };
    console.log('Scheduling delayed notification:', {
      localNotification4,
      schedulingOptions4,
    });
    Notifications.scheduleLocalNotificationAsync(
      localNotification4,
      schedulingOptions4
    )
      .then((id) =>
        console.info(
          `Delayed notification scheduled (${id}) at ${moment(
            schedulingOptions4.time
          ).format()}`
        )
      )
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <Text style={styles.txt}>Pronto para correr?</Text>
        <Button
          title="Acho que sim..."
          onPress={() => this._sendImmediateNotification()}
          color="#8B0000"
        />
        <Text>{'\n'}</Text>
        <Button
          title="Acho que não..."
          onPress={() => this._sendDelayedNotification()}
          color="#8B0000"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontWeight: 'bold',
    height: 50,
    fontSize: 20,
    color: 'white',
  },
});
