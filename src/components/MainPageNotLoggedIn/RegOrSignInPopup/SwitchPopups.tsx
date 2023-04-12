import { ReactElement } from "react";
import { RegSignInPopup } from '../../../utils/types';

interface SwitchPopupsPropsType {
  whichPopup: RegSignInPopup,
  handleSwitchPopups: () => void,
}

const SwitchPopups: React.FC<SwitchPopupsPropsType> = ({whichPopup, handleSwitchPopups}: SwitchPopupsPropsType): ReactElement => {
  return (
    <div className='flex flex-row'>
      <p className="text-[#00265F]">{whichPopup.areYouRegistered}</p>
      <button onClick={handleSwitchPopups} type="button" className="text-[#0D87FF] ml-[16px]"><a>{whichPopup.signIn}</a></button>
    </div>
  );
}

export default SwitchPopups;