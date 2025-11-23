
import { ICard } from '../models/Card';

// Interface para request de marcar carta como conhecida
export interface IMarkAsKnownRequest extends Pick<ICard, 'userId' | 'cardId'> {}

// Interface para response básica de cartas - seleciona apenas as propriedades necessárias
export interface ICardResponse extends Pick<ICard, 'id' | 'cardId' | 'userId' > {}

// Interface para response ao listar todas as cartas - omite o id interno da carta
export interface IListAllCardsResponse extends Omit<ICardResponse, 'id'> {}