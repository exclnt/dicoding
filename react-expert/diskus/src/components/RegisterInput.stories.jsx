
import RegisterInput from './RegisterInput';

export default {
  title: 'Components/RegisterInput',
  component: RegisterInput,
};

const Template = (args) => <RegisterInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  register: (data) => console.log('Register submitted:', data),
};
