import {EventEmitter} from 'events';

let appEvents=new EventEmitter();
//EventGetEpisodes - загрузить эпизоды
//EventCheckEpisode - выбран эпизод для подробного отображения
//EventCloseModalEpisode - закрыть окно
//EventAddToFavorites - добавить епизод в избранное
//removeFromFavorites - удаление эпизода

export {appEvents};
