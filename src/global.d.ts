/**
 * Temporary token for the current user’s session, or `null` if the user is not logged in.
 *
 * A user token is created when a logged-in user loads a Koji, and destroyed when the user closes the Koji. If the user revisits the Koji, a different token is generated. Tokens are specific to a user and a Koji, so the same user will have different tokens for different Kojis.
 *
 */
declare type UserToken = string | null;
