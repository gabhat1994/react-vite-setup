import NoumProgressWrapper from './NoumProgress';
import { NoumProgressData } from './mock';

const itemClicked = (id: string) => {
  // eslint-disable-next-line no-alert
  window.alert(id);
};
export const NoumProressWrapperStories = () => (
  <NoumProgressWrapper
    profileProgressPercentage={26}
    profileProgressItems={NoumProgressData}
    onItemClicked={itemClicked}
  />
);
export default {
  title: 'UI/Chambers/NoumProgress',
  component: NoumProressWrapperStories,
};
