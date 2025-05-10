export interface Project {
  id: string;
  projectImgUrl: string;
  name: string;
  url: string;
  repos: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
}
