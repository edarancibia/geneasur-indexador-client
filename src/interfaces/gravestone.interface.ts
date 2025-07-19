export interface Gravestone {
    id: string;
    name: string;
    lastname: string;
    url: string;
    dateOfDeath: string;
    createdAt: string;
    updatedAt: string;
    cemetery: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      city: { id: string; name: string; createdAt: string; updatedAt: string; country: { id: string; name: string; createdAt: string; updatedAt: string; } };
    };
  }  