
import LoginInput from './LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput,
};

const Template = (args) => <LoginInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  login: (data) => console.log('Login submitted:', data),
};
