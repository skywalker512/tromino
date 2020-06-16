import Preact from 'preact'

import TrominoBox from "./trominobox"

Preact.render(
  <TrominoBox size={4} initX={0} initY={0} />,
  document.getElementById('tromino-fig')
)
