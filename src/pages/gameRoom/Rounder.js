import React from 'react';
import styled from 'styled-components';

const Rounder = ({ round, maxRound }) => {
  return (
    <div>
      <div>
        {round}/{maxRound}
      </div>
    </div>
  );
};

export default Rounder;
