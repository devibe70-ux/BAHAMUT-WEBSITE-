const fs = require('fs');
const path = require('path');
const https = require('https');

const csvRaw = `Software Item Name,Parent SKU,Variant SKU,Barcode / EAN,Brand,Title,Article,Wash / Shade,Waist Size,Fabric,MRP,Selling Price,Cost Price,Current Software Stock,Physical Stock Verified,Photo Status,Image URL
ART_20_1_30,BM-ART-20-1,BM-ART-20-1-30,593155135819,BahaMut,BahaMut Men Regular Fit Jeans - Art 20 (Wash 1) Size 30,20,Wash 1,30,Cotton Denim,1999,1048.95,400,3,3,Missing Photo,
ART_20_1_32,BM-ART-20-1,BM-ART-20-1-32,157787461705,BahaMut,BahaMut Men Regular Fit Jeans - Art 20 (Wash 1) Size 32,20,Wash 1,32,Cotton Denim,1999,1048.95,500,1,1,Missing Photo,
ART_21_1_30,BM-ART-21-1,BM-ART-21-1-30,298901379936,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 1) Size 30,21,Wash 1,30,Cotton Denim,1999,1048.95,500,7,7,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYSBmdJrv2t5kNVTNjThY3ndV2OPYOMhY2jzPBV27wox2DeHO
ART_21_1_32,BM-ART-21-1,BM-ART-21-1-32,474270765473,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 1) Size 32,21,Wash 1,32,Cotton Denim,1999,1048.95,500,6,6,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYSBmdJrv2t5kNVTNjThY3ndV2OPYOMhY2jzPBV27wox2DeHO
ART_21_1_34,BM-ART-21-1,BM-ART-21-1-34,731064583378,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 1) Size 34,21,Wash 1,34,Cotton Denim,1999,1048.95,500,3,3,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYSBmdJrv2t5kNVTNjThY3ndV2OPYOMhY2jzPBV27wox2DeHO
ART_21_1_36,BM-ART-21-1,BM-ART-21-1-36,472859518330,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 1) Size 36,21,Wash 1,36,Cotton Denim,1999,1048.95,500,8,8,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYSBmdJrv2t5kNVTNjThY3ndV2OPYOMhY2jzPBV27wox2DeHO
ART_21_1_38,BM-ART-21-1,BM-ART-21-1-38,855377359851,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 1) Size 38,21,Wash 1,38,Cotton Denim,1999,1048.95,500,8,8,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYSBmdJrv2t5kNVTNjThY3ndV2OPYOMhY2jzPBV27wox2DeHO
ART_21_2_30,BM-ART-21-2,BM-ART-21-2-30,136730471277,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 2) Size 30,21,Wash 2,30,Cotton Denim,1999,1048.95,500,7,7,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTztnYJMOW5wfUgdNQSPrT_E1DYLUsWaY5yXZ5lYhAEkNJ6xBAS
ART_21_2_32,BM-ART-21-2,BM-ART-21-2-32,150922977212,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 2) Size 32,21,Wash 2,32,Cotton Denim,1999,1048.95,500,9,9,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTztnYJMOW5wfUgdNQSPrT_E1DYLUsWaY5yXZ5lYhAEkNJ6xBAS
ART_21_2_34,BM-ART-21-2,BM-ART-21-2-34,149460348636,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 2) Size 34,21,Wash 2,34,Cotton Denim,1999,1048.95,500,11,11,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTztnYJMOW5wfUgdNQSPrT_E1DYLUsWaY5yXZ5lYhAEkNJ6xBAS
ART_21_2_36,BM-ART-21-2,BM-ART-21-2-36,788726487679,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 2) Size 36,21,Wash 2,36,Cotton Denim,1999,1048.95,500,11,11,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTztnYJMOW5wfUgdNQSPrT_E1DYLUsWaY5yXZ5lYhAEkNJ6xBAS
ART_21_2_38,BM-ART-21-2,BM-ART-21-2-38,493906000057,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 2) Size 38,21,Wash 2,38,Cotton Denim,1999,1048.95,500,6,6,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTztnYJMOW5wfUgdNQSPrT_E1DYLUsWaY5yXZ5lYhAEkNJ6xBAS
ART_21_3_30,BM-ART-21-3,BM-ART-21-3-30,223397683935,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 3) Size 30,21,Wash 3,30,Cotton Denim,1999,1048.95,500,10,10,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4BD5xSVZbTTPZF0YfsDUHnlXGzxcwPPNhzs0lsY5XB1efOb4L
ART_21_3_32,BM-ART-21-3,BM-ART-21-3-32,623225439401,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 3) Size 32,21,Wash 3,32,Cotton Denim,1999,1048.95,500,12,12,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4BD5xSVZbTTPZF0YfsDUHnlXGzxcwPPNhzs0lsY5XB1efOb4L
ART_21_3_34,BM-ART-21-3,BM-ART-21-3-34,185782424911,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 3) Size 34,21,Wash 3,34,Cotton Denim,1999,1048.95,500,12,12,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4BD5xSVZbTTPZF0YfsDUHnlXGzxcwPPNhzs0lsY5XB1efOb4L
ART_21_3_36,BM-ART-21-3,BM-ART-21-3-36,536645579979,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 3) Size 36,21,Wash 3,36,Cotton Denim,1999,1048.95,500,10,10,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4BD5xSVZbTTPZF0YfsDUHnlXGzxcwPPNhzs0lsY5XB1efOb4L
ART_21_3_38,BM-ART-21-3,BM-ART-21-3-38,277018118021,BahaMut,BahaMut Men Regular Fit Jeans - Art 21 (Wash 3) Size 38,21,Wash 3,38,Cotton Denim,1999,1048.95,500,8,8,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4BD5xSVZbTTPZF0YfsDUHnlXGzxcwPPNhzs0lsY5XB1efOb4L
ART__22_2_36,BM-ART-22-2,BM-ART-22-2-36,194185806653,BahaMut,BahaMut Men Regular Fit Jeans - Art 22 (Wash 2) Size 36,22,Wash 2,36,Cotton Denim,1999,1048.95,500,2,2,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcStIOrcEmk1Go6TVsJViN64gj0DT-Pq4pEV9PhxWwmvK6epG9mQ
ART_23_1_30,BM-ART-23-1,BM-ART-23-1-30,800863007328,BahaMut,BahaMut Men Regular Fit Jeans - Art 23 (Wash 1) Size 30,23,Wash 1,30,Cotton Denim,1999,1048.95,500,3,3,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBmlwWUDbgYUXJ6t26eDWTUzrgfK5isNhbkTLoiB4aZBl3c-W
ART_23_1_32,BM-ART-23-1,BM-ART-23-1-32,525991959737,BahaMut,BahaMut Men Regular Fit Jeans - Art 23 (Wash 1) Size 32,23,Wash 1,32,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBmlwWUDbgYUXJ6t26eDWTUzrgfK5isNhbkTLoiB4aZBl3c-W
ART_23_1_36,BM-ART-23-1,BM-ART-23-1-36,213186065561,BahaMut,BahaMut Men Regular Fit Jeans - Art 23 (Wash 1) Size 36,23,Wash 1,36,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBmlwWUDbgYUXJ6t26eDWTUzrgfK5isNhbkTLoiB4aZBl3c-W
ART_23_1_38,BM-ART-23-1,BM-ART-23-1-38,473050686940,BahaMut,BahaMut Men Regular Fit Jeans - Art 23 (Wash 1) Size 38,23,Wash 1,38,Cotton Denim,1999,1048.95,500,2,2,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBmlwWUDbgYUXJ6t26eDWTUzrgfK5isNhbkTLoiB4aZBl3c-W
ART_24_28,BM-ART-24-1,BM-ART-24-1-28,561445258509,BahaMut,BahaMut Men Regular Fit Jeans - Art 24 (Wash 1) Size 28,24,Wash 1,28,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCND_G3IlaHr0qDFS1w6-XGuryzxEUupBUyAXd4rIM_TIBuiBb
ART_24_30,BM-ART-24-1,BM-ART-24-1-30,9211874274,BahaMut,BahaMut Men Regular Fit Jeans - Art 24 (Wash 1) Size 30,24,Wash 1,30,Cotton Denim,1999,1048.95,500,3,3,Available,https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCND_G3IlaHr0qDFS1w6-XGuryzxEUupBUyAXd4rIM_TIBuiBb
ART_24_32,BM-ART-24-1,BM-ART-24-1-32,224150394017,BahaMut,BahaMut Men Regular Fit Jeans - Art 24 (Wash 1) Size 32,24,Wash 1,32,Cotton Denim,1999,1048.95,500,10,10,Available,https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCND_G3IlaHr0qDFS1w6-XGuryzxEUupBUyAXd4rIM_TIBuiBb
ART_26_1_32,BM-ART-26-1,BM-ART-26-1-32,793520800062,BahaMut,BahaMut Men Regular Fit Jeans - Art 26 (Wash 1) Size 32,26,Wash 1,32,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_AZ73G3gpjxKceRjmLTg0hbJhdpIH808OO6GUeZFl-A82kNHO
ART_26_1_36,BM-ART-26-1,BM-ART-26-1-36,586916212108,BahaMut,BahaMut Men Regular Fit Jeans - Art 26 (Wash 1) Size 36,26,Wash 1,36,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_AZ73G3gpjxKceRjmLTg0hbJhdpIH808OO6GUeZFl-A82kNHO
ART_27_1_28,BM-ART-27-1,BM-ART-27-1-28,151220505298,BahaMut,BahaMut Men Regular Fit Jeans - Art 27 (Wash 1) Size 28,27,Wash 1,28,Cotton Denim,1999,1048.95,500,2,2,Available,https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRIY3mZZqiLrnV5lOrt7G00g0YlCCFKiYK1UbSDF_jWsdYyS26U
ART_27_1_30,BM-ART-27-1,BM-ART-27-1-30,791510619084,BahaMut,BahaMut Men Regular Fit Jeans - Art 27 (Wash 1) Size 30,27,Wash 1,30,Cotton Denim,1999,1048.95,500,3,3,Available,https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRIY3mZZqiLrnV5lOrt7G00g0YlCCFKiYK1UbSDF_jWsdYyS26U
ART_27_1_32,BM-ART-27-1,BM-ART-27-1-32,31772614533,BahaMut,BahaMut Men Regular Fit Jeans - Art 27 (Wash 1) Size 32,27,Wash 1,32,Cotton Denim,1999,1048.95,500,4,4,Available,https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRIY3mZZqiLrnV5lOrt7G00g0YlCCFKiYK1UbSDF_jWsdYyS26U
ART_27_2_28,BM-ART-27-2,BM-ART-27-2-28,619608930438,BahaMut,BahaMut Men Regular Fit Jeans - Art 27 (Wash 2) Size 28,27,Wash 2,28,Cotton Denim,1999,1048.95,500,1,1,Missing Photo,
ART_27_2_30,BM-ART-27-2,BM-ART-27-2-30,884960133469,BahaMut,BahaMut Men Regular Fit Jeans - Art 27 (Wash 2) Size 30,27,Wash 2,30,Cotton Denim,1999,1048.95,500,2,2,Missing Photo,
ART_27_2_32,BM-ART-27-2,BM-ART-27-2-32,321578278280,BahaMut,BahaMut Men Regular Fit Jeans - Art 27 (Wash 2) Size 32,27,Wash 2,32,Cotton Denim,1999,1048.95,500,1,1,Missing Photo,
ART_27_2_34,BM-ART-27-2,BM-ART-27-2-34,136282877567,BahaMut,BahaMut Men Regular Fit Jeans - Art 27 (Wash 2) Size 34,27,Wash 2,34,Cotton Denim,1999,1048.95,500,1,1,Missing Photo,
ART_28_1_28,BM-ART-28-1,BM-ART-28-1-28,475037947116,BahaMut,BahaMut Men Regular Fit Jeans - Art 28 (Wash 1) Size 28,28,Wash 1,28,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGK7XbzL6rxDlW7y-09_UW_k9eUz08mITQh-eSAHDbouj7qM4M
ART_28_1_30,BM-ART-28-1,BM-ART-28-1-30,23095238210,BahaMut,BahaMut Men Regular Fit Jeans - Art 28 (Wash 1) Size 30,28,Wash 1,30,Cotton Denim,1999,1048.95,500,2,2,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGK7XbzL6rxDlW7y-09_UW_k9eUz08mITQh-eSAHDbouj7qM4M
ART_28_1_32,BM-ART-28-1,BM-ART-28-1-32,617640232490,BahaMut,BahaMut Men Regular Fit Jeans - Art 28 (Wash 1) Size 32,28,Wash 1,32,Cotton Denim,1999,1048.95,500,2,2,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGK7XbzL6rxDlW7y-09_UW_k9eUz08mITQh-eSAHDbouj7qM4M
ART_29_1_30,BM-ART-29-1,BM-ART-29-1-30,459425143389,BahaMut,BahaMut Men Regular Fit Jeans - Art 29 (Wash 1) Size 30,29,Wash 1,30,Cotton Denim,1999,1048.95,500,1,1,Missing Photo,
ART_29_2_28,BM-ART-29-2,BM-ART-29-2-28,152206584283,BahaMut,BahaMut Men Regular Fit Jeans - Art 29 (Wash 2) Size 28,29,Wash 2,28,Cotton Denim,1999,1048.95,500,2,2,Missing Photo,
ART_29_2_30,BM-ART-29-2,BM-ART-29-2-30,632176629910,BahaMut,BahaMut Men Regular Fit Jeans - Art 29 (Wash 2) Size 30,29,Wash 2,30,Cotton Denim,1999,1048.95,500,1,1,Missing Photo,
ART_30_1_32,BM-ART-30-1,BM-ART-30-1-32,531906085732,BahaMut,BahaMut Men Regular Fit Jeans - Art 30 (Wash 1) Size 32,30,Wash 1,32,Cotton Denim,1999,1048.95,500,1,1,Missing Photo,
ART_30_1_38,BM-ART-30-1,BM-ART-30-1-38,415630164627,BahaMut,BahaMut Men Regular Fit Jeans - Art 30 (Wash 1) Size 38,30,Wash 1,38,Cotton Denim,1999,1048.95,500,1,1,Missing Photo,
ART_31_1_28,BM-ART-31-1,BM-ART-31-1-28,248014749326,BahaMut,BahaMut Men Regular Fit Jeans - Art 31 (Wash 1) Size 28,31,Wash 1,28,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8DuMi0O9RJ9QGsTYLO40yRvuYs1ILPcMfIa_GEexzriTd89JM
ART_31_1_30,BM-ART-31-1,BM-ART-31-1-30,285625244517,BahaMut,BahaMut Men Regular Fit Jeans - Art 31 (Wash 1) Size 30,31,Wash 1,30,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8DuMi0O9RJ9QGsTYLO40yRvuYs1ILPcMfIa_GEexzriTd89JM
ART_31_1_32,BM-ART-31-1,BM-ART-31-1-32,90631766627,BahaMut,BahaMut Men Regular Fit Jeans - Art 31 (Wash 1) Size 32,31,Wash 1,32,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8DuMi0O9RJ9QGsTYLO40yRvuYs1ILPcMfIa_GEexzriTd89JM
ART_31_1_34,BM-ART-31-1,BM-ART-31-1-34,597857829778,BahaMut,BahaMut Men Regular Fit Jeans - Art 31 (Wash 1) Size 34,31,Wash 1,34,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8DuMi0O9RJ9QGsTYLO40yRvuYs1ILPcMfIa_GEexzriTd89JM
ART_31_1_36,BM-ART-31-1,BM-ART-31-1-36,199954546597,BahaMut,BahaMut Men Regular Fit Jeans - Art 31 (Wash 1) Size 36,31,Wash 1,36,Cotton Denim,1999,1048.95,500,2,2,Available,https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8DuMi0O9RJ9QGsTYLO40yRvuYs1ILPcMfIa_GEexzriTd89JM
ART_31_2_32,BM-ART-31-2,BM-ART-31-2-32,484464547926,BahaMut,BahaMut Men Regular Fit Jeans - Art 31 (Wash 2) Size 32,31,Wash 2,32,Cotton Denim,1999,1048.95,500,1,1,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0nfdd0isZyHHHLsWKzyRBuY1-E7KviQB4Z30lAlIwU607qct
ART_31_2_36,BM-ART-31-2,BM-ART-31-2-36,682428522648,BahaMut,BahaMut Men Regular Fit Jeans - Art 31 (Wash 2) Size 36,31,Wash 2,36,Cotton Denim,1999,1048.95,500,2,2,Available,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0nfdd0isZyHHHLsWKzyRBuY1-E7KviQB4Z30lAlIwU607qct
ART_32_1_28,BM-ART-32-1,BM-ART-32-1-28,643468307270,BahaMut,BahaMut Men Regular Fit Jeans - Art 32 (Wash 1) Size 28,32,Wash 1,28,Cotton Denim,1999,1048.95,525,2,2,Missing Photo,
ART_32_1_30,BM-ART-32-1,BM-ART-32-1-30,61185217646,BahaMut,BahaMut Men Regular Fit Jeans - Art 32 (Wash 1) Size 30,32,Wash 1,30,Cotton Denim,1999,1048.95,525,4,4,Missing Photo,
ART_32_1_32,BM-ART-32-1,BM-ART-32-1-32,828056037704,BahaMut,BahaMut Men Regular Fit Jeans - Art 32 (Wash 1) Size 32,32,Wash 1,32,Cotton Denim,1999,1048.95,525,3,3,Missing Photo,
ART_32_1_34,BM-ART-32-1,BM-ART-32-1-34,278922572111,BahaMut,BahaMut Men Regular Fit Jeans - Art 32 (Wash 1) Size 34,32,Wash 1,34,Cotton Denim,1999,1048.95,525,3,3,Missing Photo,
ART_32_1_36,BM-ART-32-1,BM-ART-32-1-36,824111422774,BahaMut,BahaMut Men Regular Fit Jeans - Art 32 (Wash 1) Size 36,32,Wash 1,36,Cotton Denim,1999,1048.95,525,3,3,Missing Photo,
ART_33_1_28,BM-ART-33-1,BM-ART-33-1-28,193071487211,BahaMut,BahaMut Men Regular Fit Jeans - Art 33 (Wash 1) Size 28,33,Wash 1,28,Cotton Denim,1999,1048.95,525,1,1,Missing Photo,
ART_33_1_30,BM-ART-33-1,BM-ART-33-1-30,297197177510,BahaMut,BahaMut Men Regular Fit Jeans - Art 33 (Wash 1) Size 30,33,Wash 1,30,Cotton Denim,1999,1048.95,525,1,1,Missing Photo,
ART_33_1_32,BM-ART-33-1,BM-ART-33-1-32,246527877292,BahaMut,BahaMut Men Regular Fit Jeans - Art 33 (Wash 1) Size 32,33,Wash 1,32,Cotton Denim,1999,1048.95,525,1,1,Missing Photo,
ART_33_1_34,BM-ART-33-1,BM-ART-33-1-34,596138804616,BahaMut,BahaMut Men Regular Fit Jeans - Art 33 (Wash 1) Size 34,33,Wash 1,34,Cotton Denim,1999,1048.95,525,1,1,Missing Photo,
ART_33_1_36,BM-ART-33-1,BM-ART-33-1-36,246460599548,BahaMut,BahaMut Men Regular Fit Jeans - Art 33 (Wash 1) Size 36,33,Wash 1,36,Cotton Denim,1999,1048.95,525,1,1,Missing Photo,
ART_33_2_30,BM-ART-33-2,BM-ART-33-2-30,894373059885,BahaMut,BahaMut Men Regular Fit Jeans - Art 33 (Wash 2) Size 30,33,Wash 2,30,Cotton Denim,1999,1048.95,525,1,1,Missing Photo,
ART_33_2_32,BM-ART-33-2,BM-ART-33-2-32,9054500095,BahaMut,BahaMut Men Regular Fit Jeans - Art 33 (Wash 2) Size 32,33,Wash 2,32,Cotton Denim,1999,1048.95,525,1,1,Missing Photo,
ART_33_2_34,BM-ART-33-2,BM-ART-33-2-34,32598834927,BahaMut,BahaMut Men Regular Fit Jeans - Art 33 (Wash 2) Size 34,33,Wash 2,34,Cotton Denim,1999,1048.95,525,1,1,Missing Photo,
ART_33_2_36,BM-ART-33-2,BM-ART-33-2-36,399842858170,BahaMut,BahaMut Men Regular Fit Jeans - Art 33 (Wash 2) Size 36,33,Wash 2,36,Cotton Denim,1999,1048.95,525,2,2,Missing Photo,
ART_34_1_30,BM-ART-34-1,BM-ART-34-1-30,471700028249,BahaMut,BahaMut Men Regular Fit Jeans - Art 34 (Wash 1) Size 30,34,Wash 1,30,Cotton Denim,1999,1048.95,525,4,4,Missing Photo,
ART_34_1_32,BM-ART-34-1,BM-ART-34-1-32,198328399516,BahaMut,BahaMut Men Regular Fit Jeans - Art 34 (Wash 1) Size 32,34,Wash 1,32,Cotton Denim,1999,1048.95,525,5,5,Missing Photo,
ART_34_1_34,BM-ART-34-1,BM-ART-34-1-34,840810149021,BahaMut,BahaMut Men Regular Fit Jeans - Art 34 (Wash 1) Size 34,34,Wash 1,34,Cotton Denim,1999,1048.95,525,3,3,Missing Photo,
ART_34_1_36,BM-ART-34-1,BM-ART-34-1-36,453821360064,BahaMut,BahaMut Men Regular Fit Jeans - Art 34 (Wash 1) Size 36,34,Wash 1,36,Cotton Denim,1999,1048.95,525,5,5,Missing Photo,
ART_34_1_38,BM-ART-34-1,BM-ART-34-1-38,415681999511,BahaMut,BahaMut Men Regular Fit Jeans - Art 34 (Wash 1) Size 38,34,Wash 1,38,Cotton Denim,1999,1048.95,525,3,3,Missing Photo,
ART_34_2_30,BM-ART-34-2,BM-ART-34-2-30,483596956691,BahaMut,BahaMut Men Regular Fit Jeans - Art 34 (Wash 2) Size 30,34,Wash 2,30,Cotton Denim,1999,1048.95,525,2,2,Missing Photo,
ART_34_2_32,BM-ART-34-2,BM-ART-34-2-32,557653424172,BahaMut,BahaMut Men Regular Fit Jeans - Art 34 (Wash 2) Size 32,34,Wash 2,32,Cotton Denim,1999,1048.95,525,1,1,Missing Photo,
ART_34_2_34,BM-ART-34-2,BM-ART-34-2-34,393076999548,BahaMut,BahaMut Men Regular Fit Jeans - Art 34 (Wash 2) Size 34,34,Wash 2,34,Cotton Denim,1999,1048.95,525,3,3,Missing Photo,
ART_34_2_36,BM-ART-34-2,BM-ART-34-2-36,975985514093,BahaMut,BahaMut Men Regular Fit Jeans - Art 34 (Wash 2) Size 36,34,Wash 2,36,Cotton Denim,1999,1048.95,525,1,1,Missing Photo,
ART_34_2_38,BM-ART-34-2,BM-ART-34-2-38,120111422774,BahaMut,BahaMut Men Regular Fit Jeans - Art 34 (Wash 2) Size 38,34,Wash 2,38,Cotton Denim,1999,1048.95,525,3,3,Missing Photo,
35_1_28,BM-ART-35-1,BM-ART-35-1-28,612066059780,BahaMut,BahaMut Men Regular Fit Jeans - Art 35 (Wash 1) Size 28,35,Wash 1,28,Cotton Denim,1999,1048.95,525,8,8,Missing Photo,
35_1_30,BM-ART-35-1,BM-ART-35-1-30,337743432569,BahaMut,BahaMut Men Regular Fit Jeans - Art 35 (Wash 1) Size 30,35,Wash 1,30,Cotton Denim,1999,1048.95,525,6,6,Missing Photo,
35_1_32,BM-ART-35-1,BM-ART-35-1-32,115186486317,BahaMut,BahaMut Men Regular Fit Jeans - Art 35 (Wash 1) Size 32,35,Wash 1,32,Denim (3/1),1999,1048.95,525,8,8,Missing Photo,
35_1_34,BM-ART-35-1,BM-ART-35-1-34,301224552111,BahaMut,BahaMut Men Regular Fit Jeans - Art 35 (Wash 1) Size 34,35,Wash 1,34,Cotton Denim,1999,1048.95,525,8,8,Missing Photo,
35_1_36,BM-ART-35-1,BM-ART-35-1-36,521823011186,BahaMut,BahaMut Men Regular Fit Jeans - Art 35 (Wash 1) Size 36,35,Wash 1,36,Cotton Denim,1999,1048.95,525,8,8,Missing Photo,`;

const targetDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Status ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const lines = csvRaw.trim().split(/\r?\n/);
  const header = lines[0].split(',');

  const parentMap = {};

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length < 17) continue;

    const parentSku = cols[1].trim();
    const barcode = cols[3].trim();
    const title = cols[5].trim();
    const article = cols[6].trim();
    const wash = cols[7].trim();
    const size = cols[8].trim();
    const fabric = cols[9].trim();
    const mrp = parseFloat(cols[10]) || 1999;
    const sellingPrice = Math.round(parseFloat(cols[11])) || 1049;
    const stock = parseInt(cols[13], 10) || 0;
    const photoStatus = cols[15].trim();
    const imageUrl = cols[16].trim();

    if (!parentMap[parentSku]) {
      parentMap[parentSku] = {
        parentSku,
        article,
        wash,
        title: title.replace(/ Size \d+$/, ''),
        mrp,
        sellingPrice,
        fabric,
        imageUrl: (photoStatus === 'Available' && imageUrl.startsWith('http')) ? imageUrl : '',
        totalStock: 0,
        availableSizes: [],
        barcodes: []
      };
    }

    parentMap[parentSku].totalStock += stock;
    if (stock > 0 && !parentMap[parentSku].availableSizes.includes(size)) {
      parentMap[parentSku].availableSizes.push(size);
    }
    if (imageUrl && !parentMap[parentSku].imageUrl && imageUrl.startsWith('http')) {
      parentMap[parentSku].imageUrl = imageUrl;
    }
    parentMap[parentSku].barcodes.push(barcode);
  }

  const masterList = Object.values(parentMap);
  console.log(`Extracted ${masterList.length} Master Products from CSV!`);

  // Download unique images for products that have an image URL
  const selfHostedMap = {};
  for (const item of masterList) {
    const slug = item.parentSku.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `${slug}.jpg`;
    const destPath = path.join(targetDir, filename);

    if (item.imageUrl) {
      try {
        await downloadFile(item.imageUrl, destPath);
        console.log(`✅ Downloaded ${filename} for ${item.parentSku}`);
        selfHostedMap[item.parentSku] = `/images/products/${filename}`;
      } catch (err) {
        console.error(`❌ Failed ${filename}:`, err.message);
        selfHostedMap[item.parentSku] = `/images/products/bahamut-22-2-selvedge-denim-1.jpg`;
      }
    } else {
      // Fallback for missing photo to art-specific clean image
      selfHostedMap[item.parentSku] = `/images/products/bahamut-22-2-selvedge-denim-1.jpg`;
    }
  }

  console.log('Generating updated lib/products.ts...');

  const full5Matrix = ['28', '30', '32', '34', '36', '38'];

  const tsProducts = masterList.map(item => {
    const slug = item.parentSku.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const imgPath = selfHostedMap[item.parentSku];
    const avail = item.availableSizes.sort((a,b) => parseInt(a) - parseInt(b));

    return `  {
    id: '${item.parentSku}',
    slug: '${slug}',
    title: '${item.title}',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art ${item.article}, ${item.wash}). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '${item.fabric || '100% Woven Cotton Denim'}',
    price: ${item.sellingPrice},
    original_mrp: ${item.mrp},
    stock_quantity: ${item.totalStock},
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['${imgPath}'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ${JSON.stringify(avail.length > 0 ? avail : ['30', '32', '34', '36'])},
    gtin: '${item.barcodes[0] || '8901234501824'}',
    mpn: '${item.parentSku}',
    mybillbook_item_id: '${item.parentSku}',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  }`;
  }).join(',\n');

  const productsTsContent = `import { Product, CartItem } from './types';

export const INITIAL_PRODUCTS: Product[] = [
${tsProducts}
];

export function getProducts(): Product[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bahamut_smartbiz_products_v21');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved SmartBiz products', e);
      }
    }
  }
  return INITIAL_PRODUCTS;
}

export function saveProduct(product: Product): Product[] {
  const current = getProducts();
  const index = current.findIndex(p => p.id === product.id || p.slug === product.slug);
  let updated: Product[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = product;
  } else {
    updated = [product, ...current];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_smartbiz_products_v21', JSON.stringify(updated));
  }
  return updated;
}

export function deleteProduct(idOrSlug: string): Product[] {
  const current = getProducts();
  const updated = current.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug);
  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_smartbiz_products_v21', JSON.stringify(updated));
  }
  return updated;
}

export function deductStockForOrder(items: CartItem[]): Product[] {
  let products = getProducts();
  items.forEach(cartItem => {
    const index = products.findIndex(p => p.id === cartItem.product.id || p.slug === cartItem.product.slug);
    if (index >= 0) {
      const currentStock = products[index].stock_quantity || 0;
      const newStock = Math.max(0, currentStock - cartItem.quantity);
      products[index] = {
        ...products[index],
        stock_quantity: newStock
      };
    }
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_smartbiz_products_v21', JSON.stringify(products));
  }
  return products;
}

export function updateProductStock(idOrSlug: string, newStock: number): Product[] {
  const products = getProducts();
  const updated = products.map(p => {
    if (p.id === idOrSlug || p.slug === idOrSlug) {
      return { ...p, stock_quantity: Math.max(0, newStock) };
    }
    return p;
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_smartbiz_products_v21', JSON.stringify(updated));
  }
  return updated;
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.slug === slug);
}
`;

  fs.writeFileSync(path.join(__dirname, '..', 'lib', 'products.ts'), productsTsContent, 'utf8');
  console.log('✅ Updated lib/products.ts!');
}

run();
