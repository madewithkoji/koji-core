/**
 * Metadata about the project and creator.
 * This information is provided by the platform but can be overridden when the Koji is initialized.
 */
export interface KojiMetadata {
  /** Unique identifier for the Koji. */
  projectId: string;

  /** Creator's username. */
  creatorUsername: string;

  /** URL reference to the creator's current profile picture. */
  creatorProfilePicture: string;
}
