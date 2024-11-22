import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import MasjidsList from '../../v1/pages/Shared/MasjidsList/MasjidsList';
import * as API from '../../v1/api-calls/index';
import { Masjid } from '../../v1/redux/Types';

vi.mock('../../v1/api-calls/index', () => ({
  fetchAllMasjids: vi.fn(),
}));

const mockMasjids = {
    "data":{
 "data": [
    {
    "location": {
        "coordinates": [
            -95.39699619999999,
            29.6778809
        ]
    },
    "widgets": [],
    "_id": "641eeb2a2903cb869dd4c8ad",
    "masjidName": "Medical Center Islamic Society (New Almeda Masjid)",
    "masjidProfilePhoto": "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-641e1295ad1e632e44700ae3/faeeb732-2fbe-4d7d-ba0b-03f9e62dd701.jpg",
    "description": "The history of the mosque dates back to the nineties of the last century, It was a humble mosque on Almeda Street (the feast in Arabic) and God has dedicated it to a privileged location in the Houston Medical Center which is the largest center in the world for oncology. Which makes many brothers from all over the world go to the Houston Medical Center for treatment to visit the mosque and perform their devotional prayer and rituals there.",
    "address": "2222 Mansard St, Houston, TX 77054, USA",
    "contact": "+1 713 799 9904",
    "lastEditor": {
        "_id": "6682bd53372782b546e4d0e0",
        "name": "Nadeem Ahmad",
        "role": "admin"
    },
    "externalLinks": [
        {
            "name": "Facebook",
            "url": "https://www.facebook.com/mcisonline",
            "_id": "6564f1bbd913374558a50e8c"
        },
        {
            "name": "Website",
            "url": "https://masjid.mcisonline.net/",
            "_id": "6564f1bbd913374558a50e8d"
        }
    ],
    "isAssigned": false,
    "createdAt": "2023-03-25T12:38:02.177Z",
    "updatedAt": "2024-07-03T19:25:19.434Z",
    "__v": 0
},
{
    "location": {
        "coordinates": [
            -96.9082566,
            33.2205919
        ]
    },
    "widgets": [],
    "_id": "6418878dccb079ecb571742c",
    "masjidName": "Islamic Center of Aubrey",
    "masjidProfilePhoto": "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-641e169cad1e632e44700bae/fcf47f89-d33b-4808-98ce-93e16971239e.jpg",
    "description": "The Islamic Center of Aubrey is a religious institution located in the city of Aubrey, Texas, in the United States. The center was established in August 2018 by a small group of Muslim families who had moved to the area and were looking for a place to gather and worship.",
    "address": "26875 US Highway 380 E, Suite 100, Aubrey, TX 76227, USA",
    "contact": "+1 469 200 2131",
    "lastEditor": {
        "_id": "6682bd53372782b546e4d0e0",
        "name": "Nadeem Ahmad",
        "role": "admin"
    },
    "externalLinks": [
        {
            "name": "Facebook",
            "url": "https://www.facebook.com/islamiccenterofaubrey/",
            "_id": "6557d4358acebade24b2979a"
        },
        {
            "name": "Website",
            "url": "https://www.aubreymasjid.org/",
            "_id": "6557d4358acebade24b2979b"
        }
    ],
    "isAssigned": false,
    "createdAt": "2023-03-20T16:19:25.767Z",
    "updatedAt": "2024-07-03T19:35:20.738Z",
    "__v": 0
},
{
    "location": {
        "coordinates": [
            -96.579088,
            33.1796944
        ]
    },
    "widgets": [],
    "_id": "6553dcb96332fe2130e20a82",
    "masjidName": "Princeton Islamic Center",
    "masjidProfilePhoto": "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-6553dcb96332fe2130e20a82/fb87706f-7223-4de8-ae2b-1cacec2e45f7.webp",
    "description": "Princeton Islamic Center (PIC), located north-east part of Collin County, was established November, 2019 to serve the religious and spiritual needs of the Muslim families in Princeton and surrounding areas. PIC is an inclusive organization that is built to promote and upheld the core values of islam and contribute meaningfully to our community. PIC welcomes all, including non-Muslims, who want to learn more about Islam.",
    "address": "521 N 4th St, Princeton, TX 75407, United States US",
    "contact": "+1 773 727 6924",
    "lastEditor": {
        "_id": "6682bd53372782b546e4d0e0",
        "name": "Nadeem Ahmad",
        "role": "admin"
    },
    "externalLinks": [
        {
            "name": "Facebook",
            "url": "https://www.facebook.com/princetontxMasjid/",
            "_id": "6554d9116332fe2130e292d7"
        },
        {
            "name": "Website",
            "url": "http://www.picmasjid.org/",
            "_id": "6554d9116332fe2130e292d8"
        }
    ],
    "isAssigned": false,
    "createdAt": "2023-11-14T20:46:49.886Z",
    "updatedAt": "2024-07-03T19:39:43.460Z",
    "__v": 0
},
{
    "location": {
        "coordinates": [
            -95.58243879999999,
            29.9354669
        ]
    },
    "widgets": [],
    "_id": "641eeb2f2903cb869dd4c957",
    "masjidName": "Masjid Ar-Raheem - Cyfair Peace Center",
    "masjidProfilePhoto": "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-641e1388ad1e632e44700b11/14e1abd2-aa74-46cf-b17b-4a2c6f867c94.jpg",
    "description": "Welcome to\nMasjid AR Raheem\nMasjid Ar-Raheem is a welcoming and inclusive Muslim community center located in the heart of Houston, Texas. We strive to provide a spiritual home for all Muslims, regardless of their background or ethnicity.\n\nWe offer a variety of programs and services to meet the needs of our community, including:\n\nFive Daily Prayers: We offer five daily prayers, including Fajr, Dhuhr, Asr, Maghrib, and Isha.\nJummah Prayer: Jummah prayer is held every Friday at 2:00 pm.",
    "address": "10762 Farm to Market 1960 Rd W, Houston, TX 77070, USA",
    "contact": "",
    "lastEditor": {
        "_id": "6682bd53372782b546e4d0e0",
        "name": "Nadeem Ahmad",
        "role": "admin"
    },
    "externalLinks": [
        {
            "name": "Facebook",
            "url": "",
            "_id": "6684043b372782b546e658e4"
        },
        {
            "name": "Website",
            "url": "https://masjidarraheem.org/",
            "_id": "6684043b372782b546e658e5"
        }
    ],
    "isAssigned": false,
    "createdAt": "2023-03-25T12:38:07.989Z",
    "updatedAt": "2024-07-03T19:47:33.202Z",
    "__v": 0
},
{
    "location": {
        "coordinates": [
            -84.3234779,
            33.842242
        ]
    },
    "widgets": [],
    "_id": "641887a6ccb079ecb57177f3",
    "masjidName": "Masjid Abu Bakr",
    "masjidProfilePhoto": "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-641e1ae3ad1e632e44700c91/f0b1a4bc-234b-4f06-aa2c-577dc7f0a514.jpg",
    "description": "",
    "address": "1775 Briarwood Rd NE, Atlanta, GA 30329, USA",
    "contact": "+14044249997",
    "lastEditor": {
        "_id": "6682bd53372782b546e4d0e0",
        "name": "Nadeem Ahmad",
        "role": "admin"
    },
    "externalLinks": [
        {
            "name": "Website",
            "url": "http://abubakrmasjid.org/",
            "_id": "641ef537d9bf221b91c35d2d"
        }
    ],
    "isAssigned": false,
    "createdAt": "2023-03-20T16:19:50.889Z",
    "updatedAt": "2024-07-03T19:51:30.740Z",
    "__v": 0
},
{
    "location": {
        "coordinates": [
            -95.6885539,
            29.69926389999999
        ]
    },
    "widgets": [],
    "_id": "6418878dccb079ecb571741d",
    "masjidName": "Masjid - Madrasah Jamiah Islamiah Texas",
    "masjidProfilePhoto": "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-641e19bdad1e632e44700c55/0975be90-d8e1-4275-80bc-3ad70a04798b.jpg",
    "description": "",
    "address": "7120 FM 1464 SUITE C, Richmond, TX 77407, USA",
    "contact": "+18323868636",
    "lastEditor": {
        "_id": "6682bd53372782b546e4d0e0",
        "name": "Nadeem Ahmad",
        "role": "admin"
    },
    "externalLinks": [
        {
            "name": "Website",
            "url": "http://jamiahislamiah.org/",
            "_id": "641ef531d9bf221b91c35c66"
        }
    ],
    "isAssigned": false,
    "createdAt": "2023-03-20T16:19:25.404Z",
    "updatedAt": "2024-07-03T19:54:39.962Z",
    "__v": 0
},
{
    "location": {
        "coordinates": [
            -95.44862479999999,
            29.95739159999999
        ]
    },
    "widgets": [],
    "_id": "641eeb292903cb869dd4c89d",
    "masjidName": "Masjid Bilal - ISGH",
    "masjidProfilePhoto": "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-641e127fad1e632e44700adf/e0e674d2-3896-4ac9-a81a-7805ba306735.jpg",
    "description": "",
    "address": "11815 Adel Rd, Houston, TX 77067, USA",
    "contact": "+12815371946",
    "lastEditor": {
        "_id": "6682bd53372782b546e4d0e0",
        "name": "Nadeem Ahmad",
        "role": "admin"
    },
    "externalLinks": [
        {
            "name": "Website",
            "url": "http://www.masjidbilalnz.org/",
            "_id": "641ef50ad9bf221b91c3573a"
        }
    ],
    "isAssigned": false,
    "createdAt": "2023-03-25T12:38:01.652Z",
    "updatedAt": "2024-07-03T20:38:29.350Z",
    "__v": 0
},
{
    "location": {
        "coordinates": [
            -96.7637218,
            33.11280359999999
        ]
    },
    "widgets": [],
    "_id": "6418878cccb079ecb57173e6",
    "masjidName": "Islamic Center of Quad Cities",
    "masjidProfilePhoto": "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-6418878cccb079ecb57173e6/b6f0d5c8-41c8-4a6b-9952-a7669470135f.jpg",
    "description": "The Islamic Center of Quad Cities is a masjid serving the Frisco, Plano, Allen, and McKinney Communities. Opened in 2018, ICQC now offers 5 daily salat, Juma Prayer, Nazirah Program, Sunday School, and many other programs Alhamdullilah",
    "address": "3620 State Hwy 121 STE 2000, Planoo, TX 75025, USA tx 87665",
    "contact": "+1 9725039999",
    "lastEditor": {
        "_id": "658047ac9274b5eabbed4ca6",
        "name": "Noor Muhammad Masud",
        "role": "subadmin"
    },
    "externalLinks": [
        {
            "name": "Facebook",
            "url": "https://www.facebook.com/IslamiccenterOfQuadCities",
            "_id": "6657374eaea460ea22ef4e56"
        },
        {
            "name": "Website",
            "url": "http://icqcmasjid.org/",
            "_id": "6657374eaea460ea22ef4e57"
        }
    ],
    "isAssigned": true,
    "createdAt": "2023-03-20T16:19:24.095Z",
    "updatedAt": "2024-07-04T05:43:06.437Z",
    "__v": 0
},
{
    "location": {
        "coordinates": [
            -96.8618208,
            32.998665
        ]
    },
    "_id": "6418878accb079ecb57173ae",
    "masjidName": "New Momin of Texas",
    "masjidProfilePhoto": "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-6418878accb079ecb57173ae/f3ee4669-f064-4af0-b743-3c1ef5d48354.jpg",
    "description": "Dear General Body Members Assalam-o-Alaykum,\n\nOn behalf of the MOMIN Executive Committee, the members of the 2024 Election Committee cordially invite you to exercise your right to vote and run for the office of MOMIN Executive Committee for the year of 1445-1447 A.H.   \n\nBelow you will find the candidate application form, election rules as well as an outline of expected responsibilities for each position. Please note, you must be a registered member of MOMIN and in good standing in order to both run for office and vote.\n",
    "address": "2945 Frankford Rd, Dallas, TX 75287, United States",
    "contact": "+1 972 812 2230",
    "lastEditor": {
        "_id": "64775ab987702875fd4c34b5",
        "name": "Riyad Hasan.",
        "role": "superadmin"
    },
    "externalLinks": [
        {
            "name": "Facebook",
            "url": "https://www.facebook.com",
            "_id": "665086e66b389f3377858c5f"
        },
        {
            "name": "Website",
            "url": "https://www.momin.org/",
            "_id": "665086e66b389f3377858c60"
        }
    ],
    "isAssigned": true,
    "createdAt": "2023-03-20T16:19:22.764Z",
    "updatedAt": "2024-07-04T06:33:58.045Z",
    "__v": 2,
    "widgets": [
        "notification",
        "event"
    ]
}
],  
"meta": {
    "total": 1692
},
"status": 200,
"message": "Success"

    }
   
}

describe('MasjidsList component', () => {
  const handleChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (API.fetchAllMasjids as jest.Mock).mockResolvedValue(mockMasjids );
  });

  test('renders the MasjidsList component', async () => {
    render(<MasjidsList handleChange={handleChange} id="6418878cccb079ecb57173e6" />);
    await waitFor(() => {
        expect(screen.getByLabelText('Masjids')).toBeInTheDocument();
    });
    await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
        
    });

  });

  test('fetches and displays masjids', async () => {
    render(<MasjidsList handleChange={handleChange} id="642c791bb291d4c6300aa533" />);

    await waitFor(() => {
      expect(API.fetchAllMasjids).toHaveBeenCalled();
    });
    const masjidslistcontainer=screen.getByTestId("masjidslistcontainer");
    const inputroot=masjidslistcontainer.getElementsByClassName("MuiInputBase-root")[0]
    // console.log(inputroot)
   
    const mouseclickevent = new MouseEvent("click", {
        bubbles: true,
    });
    inputroot.dispatchEvent(mouseclickevent);
    await waitFor(()=>{
        expect(screen.getByRole("presentation")).toBeInTheDocument();
    })
    expect(screen.getByText('New Momin of Texas')).toBeInTheDocument();
    expect(screen.getByText('Masjid Bilal - ISGH')).toBeInTheDocument();
  });

  test('selects a default masjid based on id', async () => {
    render(<MasjidsList handleChange={handleChange} id="642c791bb291d4c6300aa533" />);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith([mockMasjids[0]]);
    });
  });

  test('allows selecting a masjid', async () => {
    render(<MasjidsList handleChange={handleChange} id="642c791bb291d4c6300aa533" />);

    await waitFor(() => {
      expect(screen.getByLabelText('Masjids')).toBeInTheDocument();
    });
    const masjidslistcontainer=screen.getByTestId("masjidslistcontainer");
    const inputroot=masjidslistcontainer.getElementsByClassName("MuiInputBase-root")[0]
    // console.log(inputroot)
   
    const mouseclickevent = new MouseEvent("click", {
        bubbles: true,
    });
    inputroot.dispatchEvent(mouseclickevent);
    
    await waitFor(()=>{
        expect(screen.getByRole("presentation")).toBeInTheDocument();

    })
    fireEvent.click(screen.getByText('New Momin of Texas'));
    // 

    expect(handleChange).toHaveBeenCalled();
  });
});
